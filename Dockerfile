FROM php:8.1-apache-buster AS server

ARG UID=1000

COPY --from=composer:2.2 /usr/bin/composer /usr/bin/composer

RUN mkdir -p /usr/src/php/ext/sqlsrv \
    && curl -fsSL https://pecl.php.net/get/sqlsrv | tar xvz -C "/usr/src/php/ext/sqlsrv" --strip 1 \
    && mkdir -p /usr/src/php/ext/pdo_sqlsrv  \
    && curl -fsSL https://pecl.php.net/get/pdo_sqlsrv | tar xvz -C "/usr/src/php/ext/pdo_sqlsrv" --strip 1 \
    && apt-get update && apt-get install -y gnupg2 \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list

RUN apt-get update && ACCEPT_EULA=y apt-get install -y \
        unixodbc-dev \
        msodbcsql17 \
        libicu-dev \
        libzip-dev \
        unzip \
        libpng-dev \
        jq \
    && docker-php-ext-install \
        intl \
        zip \
        gd \
        pdo_sqlsrv \
        sqlsrv \
        pcntl \
    && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite \
    && useradd --create-home --shell /bin/bash -u "$UID" -g www-data dev \
    && mkdir /var/www/logs \
    && chown dev /var/www/logs

RUN ln -s /usr/local/bin/php /usr/bin

COPY ./ports.conf /etc/apache2/ports.conf
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

#---------------------------------------------------------------------------------------------------
FROM server AS server-dev

RUN mkdir -p /usr/src/php/ext/xdebug \
    && curl -fsSL https://pecl.php.net/get/xdebug | tar xvz -C "/usr/src/php/ext/xdebug" --strip 1 \
    && docker-php-ext-install xdebug

USER dev

#---------------------------------------------------------------------------------------------------
FROM node:16.15.1 AS client

ARG UID=1000

RUN if [ $UID -ne 0 ]; then groupmod -g "$UID" node && usermod -u "$UID" -g "$UID" node; fi

WORKDIR /home/node
