#####################################################
### base
FROM golang:1.23.3 as base
ARG GIT_URL
ARG GIT_USER
ARG GIT_PAT
WORKDIR /build

RUN go env -w GOPRIVATE="${GIT_URL}/*"
RUN git config --global url."https://${GIT_USER}:${GIT_PAT}@${GIT_URL}/".insteadOf "https://${GIT_URL}/"

# Use ARG for Renovate to detect and manage versions
RUN go install github.com/swaggo/swag/cmd/swag@v1.16.2
RUN go install github.com/vektra/mockery/v2@v2.34.2


#####################################################
### test
FROM base as test
COPY . .
RUN swag init --outputTypes go && mockery
ENTRYPOINT ["go", "test"]
CMD ["-cover", "./..."]


#####################################################
### build
FROM base as build
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY . .
RUN swag init --outputTypes go
RUN go build -o app -ldflags="-s -w" .


#####################################################
### final
# renovate: datasource=docker depName=gcr.io/distroless/base
FROM gcr.io/distroless/base:latest
WORKDIR /
COPY --from=build /build/favicon.ico favicon.ico
COPY --from=build /build/images images
COPY --from=build /build/app app
USER nonroot:nonroot

ENTRYPOINT ["/app"]
