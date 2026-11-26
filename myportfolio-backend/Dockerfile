FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 10000

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["PortfolioApi/PortfolioApi.csproj", "PortfolioApi/"]
RUN dotnet restore "PortfolioApi/PortfolioApi.csproj"

COPY . .
WORKDIR /src/PortfolioApi
RUN dotnet publish "PortfolioApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["sh", "-c", "exec dotnet PortfolioApi.dll --urls http://0.0.0.0:${PORT:-10000}"]
