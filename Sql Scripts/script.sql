drop database if exists Vehicles_System;
create database Vehicles_System;

use Vehicles_System;

create table Customer (
Customer_ID int auto_increment primary key,
PhoneNumber varchar(15) unique,
Email varchar(255) unique,
Password varchar(64),
FName varchar(255),
LName varchar(255)
); 

create table City(
City_ID int primary key auto_increment,
City varchar(30) unique
);

create table Location(
L_ID int primary key auto_increment,
State varchar(30) not null unique,
City_ID int not null,
foreign key (City_ID) references City(City_ID)  on delete cascade
);

create table Vehicle(
V_ID int primary key auto_increment,
CarName varchar(30),
LiterPer100KM int,
Seats int,
TransmissionType varchar(30),
CarType varchar(30),
FuelType varchar(30),
Rating int default 0,
Year int,
CompanyMark varchar(30),
MaximumSpeed int
);

-- LID
create table CarShowroom (
CS_ID int primary key auto_increment,
Name varchar(30),
Email varchar(255) unique,
Password varchar(64),
PhoneNumber varchar(15) unique,
Rating int,
WorkingDays int,
-- ShowroomSite varchar(255) 
LID int not null,
 foreign key (LID) references Location(L_ID)
);


-- Date in RD is repeated
create table Post(
Post_ID int primary key auto_increment, 
Customer_ID int,
V_ID int,
Date varchar(15),
Post varchar(1024),

foreign key (Customer_ID) references Customer(Customer_ID),
foreign key (V_ID) references Vehicle(V_ID)
);

create table Comment(
Comment_ID int primary key auto_increment,
Reply varchar(1024),
Date varchar(15),
ReferredComment_ID int,
Post_ID int not null,
Customer_ID int not null,

foreign key (ReferredComment_ID) references Comment(Comment_ID),
foreign key (Post_ID) references Post(Post_ID),
foreign key (Customer_ID) references Customer(Customer_ID)
);


-- LID
create table ServiceCenter(
SC_ID int primary key auto_increment,
CenterSite varchar(255) ,
WorkingHours int,
Name varchar(30),
Email varchar(255) not null unique,
Rating int,
Password varchar(64) not null,
PhoneNumber varchar(15) unique

);

create table Admin(
Admin_ID int primary key auto_increment,
PhoneNumber int unique,
Email varchar(255) unique,
Password varchar(64),
FName varchar(255),
LName varchar(255)
);

create table CustomerCart(
Customer_ID int,
V_ID int,
CS_ID int,
isNew bool,
Color varchar(30),
Price int,
Warranty varchar(30),
Quantity int,

primary key (Customer_ID,V_ID,CS_ID,isNew,Color,Warranty),
foreign key (Customer_ID) references Customer(Customer_ID)
);

create table CustomerOrder(
OrderNumber int primary key auto_increment,
Customer_ID int,
Date varchar(30)
);

create table Recommendation(
Status enum("Waiting", "Accepted", "Rejected"),
Recommendation varchar(1024),
User_ID int,
Date varchar(25),
Admin_ID int,
Recommendation_ID int auto_increment primary key,

-- To be updated
foreign key (User_ID) references Customer(Customer_ID)
);

create table Stock(
V_ID int,
CS_ID int,
isNew bool,
Color varchar(30),
Price int,
Quantity int ,
Warranty varchar(30),
primary key (V_ID, CS_ID,isNew,Color,Warranty)
);

create table Service(
Service_ID int primary key auto_increment,
Name varchar(30) unique,
Details varchar(255) Not NULL,
Image varchar(255)
);

create table CSRequest(
    Status enum("Waiting", "Accepted", "Rejected"),
    Provider_ID int,
    Admin_ID int,
    carName varchar(30),
    LiterPer100KM int,
    Seats int,
    TransmissionType varchar(30),
    CarType varchar(30),
    FuelType varchar(30),
    carYear int,
    CompanyMark varchar(30),
    Request_ID int auto_increment primary key,
    MaximumSpeed int,

    foreign key (Provider_ID) references CarShowroom(CS_ID)
);

create table SCRequest(
    Status enum("Waiting", "Accepted", "Rejected"),
    Provider_ID int,
    Admin_ID int,
    Details varchar(255) not null,
    Image varchar(255),
    ServiceName varchar(30) unique,
    Request_ID int auto_increment primary key,

    foreign key (Provider_ID) references ServiceCenter(SC_ID)
);



create table ServiceCenter_Location(
    LID int not null default -1,
    SC_ID int not null ,
    primary key(LID,SC_ID),
    foreign key (LID) references Location(L_ID)
    on delete cascade
    on update cascade,
	foreign key (SC_ID) references ServiceCenter(SC_ID)
);

create table ServiceCenter_Services(
SC_ID int not null,
Service_ID int not null,
Price int not null,
primary key(SC_ID,Service_ID),
foreign key (SC_ID) references ServiceCenter(SC_ID),
--
--
foreign key (Service_ID) references Service(Service_ID)
--
--
);

create table OrderItems(
OrderId int,
V_ID int,
CS_ID int,
isNew bool,
Color varchar(30),
Price int,
Warranty varchar(30),
Quantity int,
csName varchar(80),
primary key (OrderId,V_ID,CS_ID,isNew,Color,Warranty),
foreign key (OrderId) references CustomerOrder(OrderNumber)
);

create table Service_Reservation(
Reservation_ID int not null auto_increment primary key ,
SC_ID int not null,
Service_ID int not null,
Customer_ID int not null,
Price int not null,
Date varchar(25),
foreign key(SC_ID) references ServiceCenter(SC_ID),
--
--
foreign key(Service_ID) references Service (Service_ID),
--
--
foreign key(Customer_ID) references Customer(Customer_ID)
--
--
);



--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
------------------------------------------ Populating the Relations ------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------

insert into City values
(null, "Cairo"), (null, "Giza"), (null, "6th October");


insert into Location values
(null,'Doky',2),
(null,'Nasr City',1),
(null,'New Cairo',1),
(null,'Octoper',3),
(null,'Gesr El Suez',1)
;



insert into Stock values
(1,2,true,"red",250000,5,"5 Years/100000 KM"),
(2,2,true,"black",250000,5,"5 Years/100000 KM"),
(3,2,true,"white",250000,5,"5 Years/100000 KM"),
(4,2,true,"red",250000,5,"5 Years/100000 KM"),
(5,2,true,"black",250000,5,"5 Years/100000 KM"),
(1,2,true,"white",250000,5,"5 Years/100000 KM"),
(2,2,true,"white",250000,5,"5 Years/100000 KM"),
(3,2,false,"white",250000,5,"5 Years/100000 KM"),
(2,2,true,"blue",250000,5,"5 Years/100000 KM"),
(5,2,true,"blue",250000,5,"5 Years/100000 KM"),
(8,3,true,"blue",250000,5,"5 Years/100000 KM"),
(15,3,true,"red",250000,5,"5 Years/100000 KM"),
(9,3,true,"red",250000,5,"5 Years/100000 KM"),
(13,3,true,"red",250000,5,"5 Years/100000 KM"),
(17,3,true,"red",250000,5,"5 Years/100000 KM"),
(11,3,true,"red",250000,5,"5 Years/100000 KM")
;




insert into Customer (PhoneNumber, Email, Password, FName, LName) values
(
"01117482827",
"msamir@gmail.com",
"mohammedsamir",
"Mohammed",
"Samir"
),
(
"01286098324",
"kbaghdad@gmail.com",
"kirollosbaghdad",
"Kirollos",
"Baghdad"
)
,
(
"01147119716",
"kalaa@gmail.com",
"karimalaa",
"Karim",
"Alaa"
)
,
(
"01023020277",
"mtaher@gmail.com",
"taher",
"Mohammed",
"Taher"
)
;


insert into Vehicle values
(null, "C200", 20,5,"Manual"    ,"Coupe", "gasoline",12,2022,"MINI",280),
(null, "C300", 20,8,"Automatic" ,"Hatchback", "Diesel"  ,4,2019,"Mercedes",300),
(null, "Test", 20,5,"Automatic" ,"Coupe", "gasoline",10,2003,"Fiat"    ,280),
(null, "Prado" ,20,8,"Manual"    ,"Sedan", "electric",4,2007,"Toyota"  ,302),
(null, "Civic" ,20,5,"Manual"    ,"Hatchback", "gasoline",4,2013,"GMC"  ,302),

(null, "GT-R" ,30,5,"Automatic"    ,"Sedan", "gasoline",4,2007,"Toyota"  ,220),
(null, "Prado" ,40,8,"Manual"    ,"Sedan", "electric",5,2007,"Porsche"  ,220),
(null, "Cooper" ,60,5,"Manual"    ,"Hatchback", "gasoline",4,2013,"Dodge"  ,302),
(null, "Prado" ,26,7,"Automatic"    ,"Coupe", "gasoline",4,2013,"Toyota"  ,200),
(null, "Mazda" ,28,5,"Manual"    ,"Sedan", "electric",7,2007,"Dodge"  ,302),

(null, "Prado" ,22,5,"Automatic"    ,"Hatchback", "gasoline",4,2007,"Honda"  ,400),
(null, "Ascent" ,12,6,"Manual"    ,"Coupe", "electric",4,2007,"Toyota"  ,302),
(null, "Aventador" ,30,6,"Automatic"    ,"Sedan", "gasoline",6,2007,"Honda"  ,720),
(null, "Blazer" ,90,3,"Manual"    ,"Hatchback", "electric",4,2013,"Chevrolet"  ,302),
(null, "Bronco" ,57,5,"Automatic"    ,"Coupe", "gasoline",4,2007,"Toyota"  ,230),

(null, "bZ4X" ,45,3,"Manual"    ,"Hatchback", "gasoline",4,2007,"MINI"  ,302),
(null, "Camaro" ,23,12,"Automatic"    ,"Sedan", "Diesel",8,2013,"Toyota"  ,302),
(null, "Camry" ,65,10,"Automatic"    ,"Coupe", "gasoline",4,2007,"Lincoln"  ,300),
(null, "Celestiq" ,34,4,"Manual"    ,"Hatchback", "Diesel",9,2007,"Chevrolet"  ,302),
(null, "Prado" ,23,3,"Automatic"    ,"Sedan", "gasoline",4,2013,"Subaru"  ,400)
;


insert into CarShowroom values
(null, "Test1", "test1@gmail.com", "test1test1", "01286099324", 3, 0111111,1),
(null, "Test2", "test2@gmail.com", "test3test3", "01286099323", 3, 0111111,2),
(null, "Test3", "test3@gmail.com", "test3test3", "01286099322", 3, 0111111,1)
;


-- insert into Post values
-- (null, 1, 2, "2022-04-11", "العربية باظت خالص اغيثونا ههههههه"),
-- (null, 2, 3, "2022-02-13", "العربية باظت خالص اغيثونا ههههههه"),
-- (null, 1, 2, "2019-01-23", "العربية باظت خالص اغيثونا ههههههه")
-- ;


-- insert into Comment values
-- (null, "Hello World", "2020-02-14", null, 1, 1),
-- (null, "Hello World", "2021-03-22", 1, 2, 3),
-- (null, "Hello World", "2022-08-19", 2, 1, 2)
-- ;

insert into ServiceCenter values
(null,'Nasr City',12,'Auto Fix','center1@gmail.com',4,'center','01112145236'),
(null,'New Cairo',15,'Car Auto','center2@gmail.com',3,'center','01128547125'),
(null,'Octoper',13,'Corner Center','center3@gmail.com',5,'center','01135214367'),
(null,'Doky',14,'Al Handasia','center4@gmail.com',3,'center','01145214368'),
(null,'Gesr El Suez',17,'ARABIAN COMPANY','center5@gmail.com',2,'center','01154125739')
;


insert into ServiceCenter_Location values
(3,1),
(4,1),
(1,2),
(2,2),
(1,3),
(5,3),
(1,4),
(2,5),
(4,5)
;


insert into Admin values
(null, "01286099314", "admin1@gmail.com", "admin1admin1", "kiro", "baghdad"),
(null, "01286099313", "admin2@gmail.com", "admin2admin2", "Karim", "Alaa"),
(null, "01286099312", "admin3@gmail.com", "admin2admin2", "Mohammed", "Samir" )
;



insert into CustomerCart values
(1, 1, 1,0,'red',542000,'5 Years',2),
(2, 2, 2,0,'white',452000,'5 Years',1),
(3, 1, 2,1,'black',324485,'5 Years',1)
;

insert into CustomerOrder values
(null, 3, "2022-03-22"),
(null, 2, "2019-03-22"),
(null, 3, "2022-03-22")
;


insert into Recommendation values
("waiting", "يا ريت تعملوا تواصل مع الshowroom", 1, "2020-12-04", 1, null),
("Waiting", "Hello", 2, "2021-12-04 14:23:23", null, null),
("Rejected", "هههههههه الموقع مش ناقصه حاجة", 3, "2020-09-04", 2, null)
;


insert into Service values
(null,'Change Engine Oil','Change your engine oil with one of our available types','https://files.fm/thumb.php?i=5tbxpzn2m'),
(null,'Change Tires','Replace you tires with new tires','https://files.fm/thumb.php?i=shphxhvqx'),
(null,'Paint Your Car','Paint your car with any color and with best materials','https://files.fm/thumb.php?i=sebgj488g'),
(null,'Replace Oil Filter','Replace your oil filter easily','https://files.fm/thumb.php?i=ybwuugb3u'),
(null,'Replace Air Filter','Replace Air filter with new one','https://files.fm/thumb.php?i=a8kr94qkp'),
(null,'Battery Replacement','Replace you battery with best brands','https://files.fm/thumb.php?i=xd8sff266'),
(null,'Brake work','Test your brake and make sure it works fine','https://files.fm/thumb_show.php?i=6daxda3pc'),
(null,'Antifreeze','Add antifreeze to your car to avoid damage in cold weathers','https://files.fm/thumb.php?i=9vg7hcprm'),
(null,'Engine Tune-up','Tune up your engine with our experts to get full power from your car','https://files.fm/thumb.php?i=dfxehd5rz'),
(null,'Wheels aligning/balancing','Align or Balance your wheels to avoid damages','https://files.fm/thumb.php?i=5jfnjpwht'),
(null,'AC Check Up','Clear you ac filter, pipes and fix any malfuctions in it','https://cdn.cobone.com/deals/uae/76425/big-trd-ac-check.jpg?v=13'),
(null,'Car Wash','Wash your car with best materials in just 20 minutes','https://th.bing.com/th/id/OIP.5umrzIQ3kLhP_2bEopEMxgHaE8?pid=ImgDet&rs=1'),
(null,'Computer Diagnostics Report','Get detailed report of diagnostics from your car computer','https://cdn.cobone.com/deals/uae/76425/big-trd-ac-check.jpg?v=13'),
(null,'Wiper Blades Replacement','Replace your wiper blades with best brands','https://wonderfulengineering.com/wp-content/uploads/2020/09/10-Best-Wiper-Blade-For-Ford-F250-2-1024x959.jpg'),
(null,'Bumper Repair','Repair bumber of car by our experts','https://th.bing.com/th/id/R.e047e1546d38737bbf7f1127af16e616?rik=R805Wsl04N1XHQ&pid=ImgRaw&r=0'),
(null,'Auto Parts Replacement','Some auto spas have skilled technicians who can install replacement parts.','https://th.bing.com/th/id/R.34ca48680c62c310e8ba36bf6103be25?rik=dGnnpd1q0o8huw&pid=ImgRaw&r=0'),
(null,'Headlight Restoration','Finally, the car spa treatment is given to the headlights, which are cleaned and refinished to brighten and renew.','https://th.bing.com/th/id/OIP.xDNP_ClkQv8iklvkBcTJ9AHaFj?pid=ImgDet&rs=1'),
(null,'Odor Removal','Even after a full car detailing service, bad smells can linger and an air freshener only masks it','https://th.bing.com/th/id/OIP.LIqkXbQAgh47hsWidDTPfAAAAA?w=261&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'),
(null,'Wheel Repair','The rims are cleaned to remove dirt, oxidation, rust, and corrosion. A protective coating is then applied so they look sparkling and new.','https://th.bing.com/th/id/R.f77883554b72356b2b2c00406ccf8fa3?rik=ztReNIRxk9gCzA&pid=ImgRaw&r=0')
;

insert into ServiceCenter_Services values
(1,1,200),
(1,5,250),
(1,6,100),
(1,7,140),
(1,2,300),
(2,1,140),
(2,3,240),
(2,2,750),
(2,10,340),
(3,4,350),
(3,11,160),
(3,12,260),
(3,13,360),
(3,14,460),
(3,15,560),
(4,16,260),
(4,17,260),
(4,18,570),
(4,1,380),
(5,10,290),
(5,7,100),
(5,4,110);

insert into CSRequest values
("Waiting", 1, null, "prado", 20, 4, "Manual", "Sedan","gas", 2005, "Mercedes",null, 300),
("Accepted", 2, 2,"Test", 30,5, "Automatic", "4X4", "Diesel",  2010, "BMW",null, 200),
("Waiting", 3, null,"Corolla" ,40, 6, "Manual","Sedan", "gas",  2020, "Ferrari",null,300),
("Waiting", 1, null,"C200", 50, 7, "Manual", "4X4", "Diesel",   2019, "Mercedes", null,250);



insert into SCRequest values
("Waiting", 1, null, "Your brake fluid will be inspected for proper level and moisture content.", "https://iili.io/HTCz0gI.th.jpg", "Brake work", null), 
("Rejected", 2, 2, "Wheel alignment involves a mechanical adjustment of vehicle suspension to influence the direction and angle of the tyre's contact with the road surface.", "https://iili.io/HTCANje.jpg", "Wheels aligned/balanced", null),
("Waiting", 1, null, "Test", "https://iili.io/HTCz0gI.th.jpg", "Car Testing", null);




delimiter &&
create procedure `addCity`(in city varchar(30))
begin
insert ignore into City (City, City_ID) values (city, null);
END &&  
DELIMITER ;  



DELIMITER $$
CREATE PROCEDURE `sendrecommendation` (in rec varchar(1024),in uid int,in d varchar(25))
BEGIN
insert into vehicles_system.Recommendation values ('Waiting',rec,uid,d,null,null);
END$$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `addServicetoSC` (in scid int,in sid int,in price int)
BEGIN
insert into servicecenter_services values(scid,sid,price);
END$$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `reserve_service` (in scid int,in sid int,in cid int,in price int,in d varchar(25))
BEGIN
Insert into Service_Reservation values(null,scid,sid,cid,price,d);
END$$

DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sendrcsrequest`(in cname varchar(30),in uid int,in fueltype varchar(30),in ctype varchar(30),in ttype varchar(30),in cyear int,in companymark varchar(30))
BEGIN
insert into vehicles_system.CSRequest values ('Waiting',uid,null,cname,null,null,ttype,ctype,fueltype,cyear,companymark,null,null);
END$$

DELIMITER ;

delimiter &&
create procedure `deleteState`(in inState varchar(30))
begin
delete from Location where state = (inState);
END &&  
DELIMITER ; 

delimiter &&
create procedure `updateRecommendation`(in newStatus varchar(30), in ID int, in Recommendation_ID varchar(30))
begin
update Recommendation set Status = newStatus, Admin_ID = ID where Recommendation.Recommendation_ID = Recommendation_ID;
END &&  
DELIMITER ; 


delimiter &&
create procedure `updateSCRequest`(in newStatus varchar(30), in ID int, in Request_ID varchar(30))
begin
update SCRequest set status = newStatus, Admin_ID = ID where SCRequest.Request_ID = Request_ID;
END &&  
DELIMITER ; 

delimiter &&
create procedure `addNewCarToCart`(in Customer_ID int,in V_ID int,in CS_ID int,in isNew bool,in Color varchar(30),in Price int,in Warranty varchar(30),in Quantity int)
begin
insert into CustomerCart  
values (Customer_ID, V_ID, CS_ID,isNew,Color,Price,Warranty,Quantity);
END &&  
DELIMITER ; 

delimiter &&
create procedure `addcustomer`(PhoneNumber varchar(15),Email varchar(255),
Password varchar(64),FName varchar(255),LName varchar(255))
begin
insert into Customer  (PhoneNumber,Email,Password,FName,LName)
values (phoneNumber, Email, Password,FName,LName);
END &&  
DELIMITER ;  
