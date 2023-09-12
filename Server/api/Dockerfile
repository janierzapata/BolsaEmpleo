# Utiliza la imagen base de .NET Core SDK para compilar
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al directorio de trabajo
COPY . .

# Restaura las dependencias y compila el proyecto
RUN dotnet restore
RUN dotnet build --configuration Release --no-restore

# Publica la aplicación en una carpeta de salida
RUN dotnet publish --configuration Release --no-build --output /app/publish

# Utiliza la imagen base de .NET Core Runtime para ejecutar la aplicación
FROM mcr.microsoft.com/dotnet/aspnet:5.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos publicados desde la etapa de compilación al directorio de trabajo
COPY --from=build /app/publish .

# Expone el puerto en el que se ejecuta la aplicación (ajústalo según tus necesidades)
EXPOSE 5000

# Define el comando de inicio para ejecutar la aplicación
ENTRYPOINT ["dotnet", "api.dll"]
