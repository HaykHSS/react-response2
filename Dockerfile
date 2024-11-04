# renovate: datasource=docker depName=docker.io/library/golang
ARG GOLANG_VERSION=1.21.1         # Specify the Go version to be managed by Renovate

# renovate: datasource=github-releases depName=swaggo/swag
ARG SWAG_VERSION=v1.16.2          # Renovate will detect and update this version

# renovate: datasource=github-releases depName=vektra/mockery
ARG MOCKERY_VERSION=v2.34.2       # Renovate will detect and update this version

#####################################################
### base
FROM ${CONTAINER_REPOSITORY}/golang:${GOLANG_VERSION} as base
ARG GIT_URL
ARG GIT_USER
ARG GIT_PAT
WORKDIR /build

RUN go env -w GOPRIVATE="${GIT_URL}/*"
RUN git config --global url."https://${GIT_USER}:${GIT_PAT}@${GIT_URL}/".insteadOf "https://${GIT_URL}/"

# Use ARG for Renovate to detect and manage versions
RUN go install github.com/swaggo/swag/cmd/swag@${SWAG_VERSION}
RUN go install github.com/vektra/mockery/v2@${MOCKERY_VERSION}


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
