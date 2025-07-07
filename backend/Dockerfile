FROM dunglas/frankenphp:php8.4

ENV SERVER_NAME="8080"

WORKDIR /app

COPY . .

RUN apt update && apt install -y zip unzip libzip-dev \
    && docker-php-ext-install zip \
    && docker-php-ext-enable zip

RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \
    && php artisan route:cache

EXPOSE 8080
