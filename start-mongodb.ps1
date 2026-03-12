# Start MongoDB using Docker
Write-Host "Starting MongoDB using Docker..." -ForegroundColor Green

# Check if Docker is running
try {
    docker version > $null 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Stop existing MongoDB container if running
docker stop mongodb-construction 2>$null
docker rm mongodb-construction 2>$null

# Start MongoDB container
Write-Host "Starting MongoDB container..." -ForegroundColor Cyan
docker run -d --name mongodb-construction -p 27017:27017 -v mongodb_data:/data/db mongo:7.0

if ($LASTEXITCODE -eq 0) {
    Write-Host "MongoDB container started successfully!" -ForegroundColor Green
    Write-Host "MongoDB is now running on port 27017" -ForegroundColor Cyan
    Write-Host "Database name: construction_db" -ForegroundColor Cyan
    Write-Host "You can now start the backend server." -ForegroundColor Yellow
} else {
    Write-Host "Failed to start MongoDB container." -ForegroundColor Red
}
