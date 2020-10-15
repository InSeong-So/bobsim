39.115.14.230

CREATE TABLE `mr_members` (
  `seqNo` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(20) NOT NULL,          -- 사용자 아이디
  `password` varchar(100) NOT NULL,       -- 사용자 비밀번호
  PRIMARY KEY (`seqNo`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `mr_restaurant` (
  `seqNo` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(1000) DEFAULT NULL,		-- 지역
  `category` varchar(100) DEFAULT NULL,		-- 음식분류
  `menu` varchar(1000) DEFAULT NULL,			-- 메뉴명
  `pay` varchar(1000) DEFAULT NULL,				-- 가격
  `grade` varchar(2) DEFAULT NULL,				-- 등급
  `address` varchar(1000) DEFAULT NULL,		-- 주소
  `chainYn` varchar(1) DEFAULT NULL,			-- 체인점여부
  `note` varchar(1000) DEFAULT NULL,			-- 비고
  PRIMARY KEY (`seqNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `mr_restaurant` (
  `seqNo` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(1000) DEFAULT NULL,		-- 지역
  `category` varchar(100) DEFAULT NULL,		-- 음식 분류
  `restaurantNm` varchar(1000) NOT NULL,  -- 음식점 이름
  `menu` varchar(1000) DEFAULT NULL,			-- 음식점 메뉴명
  `pay` varchar(1000) DEFAULT NULL,				-- 가격
  `grade` varchar(2) DEFAULT NULL,				-- 등급
  `address` varchar(1000) DEFAULT NULL,		-- 주소
  `chainYn` varchar(1) DEFAULT NULL,			-- 체인점여부
  `note` varchar(1000) DEFAULT NULL,			-- 비고
  PRIMARY KEY (`seqNo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `mr_confirm` (
     `seqNo` int(11) NOT NULL AUTO_INCREMENT,
     `category`        VARCHAR(100),      -- 대분류
     `menu`            VARCHAR(1000),     -- 메뉴
     `confirmDivision` VARCHAR(4),        -- 확정식사구분
     `confirmYmd`      VARCHAR(8),        -- 확정일자
     `confirmGroup`    VARCHAR(1000),     -- 확정그룹
     `confirmUser`     VARCHAR(20),       -- 확정자
     `noRouletteTerm`  VARCHAR(2)         -- 룰렛미출력기간
     PRIMARY KEY (`seqNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;