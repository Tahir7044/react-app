use mobileStore;
CREATE TABLE `users`
(
 `userID`    varchar(100) NOT NULL ,
 `username`  varchar(45) NOT NULL ,
 `email`     varchar(100) NOT NULL ,
 `password`  varchar(100) NOT NULL ,
 `gender`    varchar(10),
 `createdAt` date NOT NULL ,
PRIMARY KEY (`userID`)
);

CREATE TABLE `Details`
(
 `detailID`   varchar(100) NOT NULL ,
 `firstName`  varchar(45) NOT NULL ,
 `lastName`   varchar(45) NOT NULL ,
 `address`    varchar(100) NOT NULL ,
 `pincode`    integer NOT NULL ,
 `city`       varchar(45) NOT NULL ,
 `state`      varchar(45) NOT NULL ,
 `phoneNumer` integer NOT NULL ,
 `email`      varchar(100) NOT NULL ,
 `userID`     varchar(100) NOT NULL ,

PRIMARY KEY (`detailID`),
FOREIGN KEY (`userID`) REFERENCES users(`userID`)
);

CREATE TABLE `Issues`
(
 `issueID`      varchar(100) NOT NULL ,
 `issueName`    varchar(100) NOT NULL ,
 `image` varchar(100) not null default("page404.png"),
 `minimumPrice` integer NOT NULL ,
 `maximumPrice` integer NOT NULL ,
 `description`  varchar(100) NOT NULL ,

PRIMARY KEY (`issueID`)
);
use mobileStore;
CREATE TABLE `Brands`
(
 `brandID`   varchar(100) NOT NULL ,
 `image`	varchar(100) default("404.png"),
 `brandName`     varchar(45) NOT NULL ,
PRIMARY KEY (`brandID`)
);
ALTER table Brands change column brand brandName varchar(45) not null;
CREATE TABLE `Products`
(
 `productID`   varchar(100) NOT NULL ,
 `mobileModel` varchar(100) NOT NULL ,
 `brandID`       varchar(100) NOT NULL ,
 `image`       varchar(100) default("404.png"),
PRIMARY KEY (`productID`)
);
ALTER table Products change column brand brandID varchar(100) not null;
ALTER table Products modify column image varchar(100) default("404.png");
ALTER TABLE Products
ADD FOREIGN KEY (brandID) REFERENCES Brands(brandID); 
CREATE TABLE `MyCart`
(
 `cartID`    varchar(100) NOT NULL ,
 `productID` varchar(100) NOT NULL ,
 `issueID`   varchar(100) NOT NULL ,
 `userID`    varchar(100) NOT NULL ,
 `isActive`  boolean NOT NULL ,

PRIMARY KEY (`cartID`),
KEY `fkIdx_152` (`productID`),
CONSTRAINT `FK_152` FOREIGN KEY `fkIdx_152` (`productID`) REFERENCES Products(`productID`),
KEY `fkIdx_155` (`issueID`),
CONSTRAINT `FK_155` FOREIGN KEY `fkIdx_155` (`issueID`) REFERENCES Issues(`issueID`),
KEY `fkIdx_191` (`userID`),
CONSTRAINT `FK_191` FOREIGN KEY `fkIdx_191` (`userID`) REFERENCES users(`userID`)
);


rename table MyCart to userCart;
CREATE TABLE `BookNow`
(
 `bookNowID`       varchar(100) NOT NULL ,
 `tax`             integer NOT NULL DEFAULT 0,
 `pickupPrice`     integer NOT NULL DEFAULT 0 ,
 `deliveryPrice`   integer NOT NULL DEFAULT 0 ,
 `pickupAddress`   integer NOT NULL ,
 `deliveryAddress` integer NOT NULL ,
 `userID`          varchar(100) NOT NULL ,

PRIMARY KEY (`bookNowID`),
KEY `fkIdx_194` (`userID`),
CONSTRAINT `FK_194` FOREIGN KEY `fkIdx_194` (`userID`) REFERENCES users(`userID`)
);


CREATE TABLE `Ordered`
(
 `orderedID` varchar(100) NOT NULL ,
 `bookNowID` varchar(100) NOT NULL ,
 `productID` varchar(100) NOT NULL ,
 `issueID`   varchar(100) NOT NULL ,
 `date`      date NOT NULL ,

PRIMARY KEY (`orderedID`),
KEY `fkIdx_248` (`bookNowID`),
CONSTRAINT `FK_248` FOREIGN KEY `fkIdx_248` (`bookNowID`) REFERENCES BookNow(`bookNowID`),
KEY `fkIdx_251` (`productID`),
CONSTRAINT `FK_251` FOREIGN KEY `fkIdx_251` (`productID`) REFERENCES Products(`productID`),
KEY `fkIdx_254` (`issueID`),
CONSTRAINT `FK_254` FOREIGN KEY `fkIdx_254` (`issueID`) REFERENCES Issues(`issueID`)
);






CREATE TABLE `Appointment`
(
 `AppintmentID` varchar(100) NOT NULL ,
 `status`       varchar(45) NOT NULL ,
 `userID`       varchar(100) NOT NULL ,
 `date`         date NOT NULL ,
 `orderedID`    varchar(100) NOT NULL ,

PRIMARY KEY (`AppintmentID`),
KEY `fkIdx_210` (`userID`),
CONSTRAINT `FK_210` FOREIGN KEY `fkIdx_210` (`userID`) REFERENCES users(`userID`),
KEY `fkIdx_258` (`orderedID`),
CONSTRAINT `FK_258` FOREIGN KEY `fkIdx_258` (`orderedID`) REFERENCES Ordered(`orderedID`)
);
