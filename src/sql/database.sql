create database tc2ba;

use tc2ba;

create table users(
                    id_usuario int not null primary key auto_increment,
                    correo varchar(50) not null unique,
                    nombre varchar(80) not null ,
                    celular varchar(15) not null,
                    comuna varchar(20) not null,
                    direccion varchar(50) not null,
                    nacimiento date not null,
                    pass varchar(255) not null,
                    rol varchar(20) default 'cliente'
);

create table contacto (
                          nombre varchar (80) not null,
                          numerocontacto varchar(80)  not null,
                          mensaje varchar (255) not null
);

describe users;


create table productos(
                        id_producto int not null primary key auto_increment,
                        nombre_producto varchar(100) not null
);

create table carrito(
                    id_carrito  int not null primary key auto_increment,
                    id_producto int not null,
                    FOREIGN KEY (id_producto) references productos(id_producto),
                    id_compra int not null,
                    FOREIGN KEY (id_compra) references compra(id_compra)

);

create table compra(
                    id_compra  int not null primary key auto_increment,
                    id_usuario int not null ,
                    FOREIGN KEY (id_usuario) references users(id_usuario)
);