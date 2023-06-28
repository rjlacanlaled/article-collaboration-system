FROM mcr.microsoft.com/dotnet/sdk:7.0 AS dotnet-builder
COPY /Api /build/src/Api
COPY /Common /build/src/Common
COPY /Data /build/src/Data
WORKDIR /build/src/Api
RUN dotnet restore
RUN dotnet publish -c Release -o /build/bin

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /bin
COPY --from=dotnet-builder /build/bin .
ENV ASPNETCORE_URLS="http://*:3000"
ENTRYPOINT ["dotnet", "Api.dll"]
EXPOSE 80 443 3000