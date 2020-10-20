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
  `locale` varchar(1000) DEFAULT NULL,		-- 지역(시도)
  `localeDetail` varchar(1000) DEFAULT NULL,		-- 지역 세부(군구)
  `address` varchar(1000) DEFAULT NULL,		-- 주소
  `category` varchar(100) DEFAULT NULL,		-- 음식 분류(한식,중식,일식,양식,분식,패스트푸드)
  `restaurantNm` varchar(1000) NOT NULL,  -- 음식점 이름
  `grade` varchar(2) DEFAULT NULL,				-- 개인 평점(5점 만점)
  `number` varchar(20) DEFAULT NULL,      -- 전화번호
  `openTime` varchar(15) DEFAULT NULL,		-- 영업 시간(평일-00:00,주말-00:00)
  `restDay`  varchar(20) DEFAULT NULL,    -- 휴점일(매주00일)
  `chainYn` varchar(1) DEFAULT NULL,			-- 체인점여부
  `note` varchar(1000) DEFAULT NULL,			-- 비고
  `updateYmd` varchar(8) DEFAULT NULL,    -- 최신화
  PRIMARY KEY (`seqNo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `mr_menu` (
  `seqNo` int(11) NOT NULL AUTO_INCREMENT,
  `restaurantNm` varchar(1000) NOT NULL,  -- 음식점 이름
  `menu` varchar(1000) DEFAULT NULL,			-- 음식점 메뉴명
  `pay` varchar(1000) DEFAULT NULL,				-- 가격(단위:원)
  `grade` varchar(2) DEFAULT NULL,				-- 개인 평점(5점 만점)
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