-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2020 at 03:25 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `credited_products`
--

CREATE TABLE `credited_products` (
  `creditor_id` int(255) NOT NULL,
  `product_id` int(255) NOT NULL,
  `quantity` bigint(255) NOT NULL,
  `date` date NOT NULL,
  `selling_price` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `credited_products`
--

INSERT INTO `credited_products` (`creditor_id`, `product_id`, `quantity`, `date`, `selling_price`) VALUES
(1, 10, 3, '2020-10-27', 20),
(1, 13, 3, '2020-11-01', 5000);

-- --------------------------------------------------------

--
-- Table structure for table `creditor_profile`
--

CREATE TABLE `creditor_profile` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` int(10) NOT NULL,
  `total_amt_payable` bigint(255) NOT NULL,
  `amt_paid` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `creditor_profile`
--

INSERT INTO `creditor_profile` (`id`, `name`, `address`, `phone`, `total_amt_payable`, `amt_paid`) VALUES
(1, 'Shravani  Sharad Chavanke', 'Flat no 6  Ratna Height ApptIndira Nagar ,Near Nashik Cambridge School', 2147483647, 15000, 900);

-- --------------------------------------------------------

--
-- Table structure for table `current_inventory`
--

CREATE TABLE `current_inventory` (
  `product_id` int(255) NOT NULL,
  `quantity` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `current_inventory`
--

INSERT INTO `current_inventory` (`product_id`, `quantity`) VALUES
(10, -4);

-- --------------------------------------------------------

--
-- Table structure for table `ordered_products`
--

CREATE TABLE `ordered_products` (
  `order_id` int(255) NOT NULL,
  `product_id` int(255) NOT NULL,
  `quantity` bigint(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `cost_per_unit` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ordered_products`
--

INSERT INTO `ordered_products` (`order_id`, `product_id`, `quantity`, `status`, `cost_per_unit`) VALUES
(8, 10, 1, '0', 40000),
(11, 10, 10, '0', 40000),
(12, 14, 1, '0', 20),
(13, 13, 1, '0', 89),
(14, 13, 2, '0', 89),
(16, 13, 2, '0', 89),
(17, 14, 8, '0', 20),
(18, 10, 2, '0', 89);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(255) NOT NULL,
  `supplier_id` int(255) NOT NULL,
  `date` date NOT NULL,
  `status` int(10) NOT NULL,
  `total_payable` bigint(255) NOT NULL,
  `paid` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `supplier_id`, `date`, `status`, `total_payable`, `paid`) VALUES
(8, 2, '2020-10-23', 0, 40000, 0),
(9, 1, '2020-10-23', 0, 350000, 200000),
(10, 2, '2020-10-25', 0, 350000, 10000),
(11, 1, '2020-10-25', 1, 400000, 0),
(12, 2, '2020-10-27', 0, 20, 0),
(13, 1, '2020-10-27', 0, 89, 0),
(14, 2, '2020-10-27', 0, 178, 0),
(15, 2, '2020-10-27', 0, 0, 0),
(16, 2, '2020-10-27', 0, 178, 0),
(17, 2, '2020-11-01', 0, 160, 0),
(18, 1, '2020-11-01', 0, 178, 0);

-- --------------------------------------------------------

--
-- Table structure for table `price_details`
--

CREATE TABLE `price_details` (
  `product_id` int(255) NOT NULL,
  `cost_price` bigint(255) NOT NULL,
  `selling_price` bigint(255) NOT NULL,
  `mrp` bigint(255) NOT NULL,
  `discount` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `price_details`
--

INSERT INTO `price_details` (`product_id`, `cost_price`, `selling_price`, `mrp`, `discount`) VALUES
(10, 89, 20, 30, 20),
(13, 89, 5000, 200000, 30),
(14, 20, 20, 20, 20);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `group_id` int(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `measuring_unit` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `group_id`, `description`, `measuring_unit`) VALUES
(10, 'Dell 100', 1, '4gb ram', 'pieces'),
(13, 'Dell 90', 1, 'good', 'pieces'),
(14, 'lenovo', 1, 'laptop', 'pieces');

-- --------------------------------------------------------

--
-- Table structure for table `product_group`
--

CREATE TABLE `product_group` (
  `id` int(11) NOT NULL,
  `g_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `total_items` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_group`
--

INSERT INTO `product_group` (`id`, `g_name`, `description`, `total_items`) VALUES
(1, 'laptop', 'all laptops', 3),
(2, 'tv', 'all tv', 0),
(3, 'phone', 'all phones', 0);

-- --------------------------------------------------------

--
-- Table structure for table `retailer`
--

CREATE TABLE `retailer` (
  `id` int(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `retailer`
--

INSERT INTO `retailer` (`id`, `username`, `password`, `name`) VALUES
(1, 'shravani_chavanke', 'abcd123', 'shravani'),
(2, 'shra_890', 'hui', 'shravani'),
(3, 'shra_890', '6790', 'shravani'),
(4, 'shra_890', '6790', 'shravani'),
(5, 'shra_890', '6790', 'shravani'),
(6, 'shravani_chavanke', 'klio', 'kkkk'),
(7, 'shravani', 'chavanke', 'shravani');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_no` int(10) NOT NULL,
  `account_no` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `address`, `phone_no`, `account_no`) VALUES
(1, 'A', 'mumbai', 1016547895, 1234567890),
(2, 'B', 'nashik', 1234567890, 126548795413);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(255) NOT NULL,
  `type` int(10) NOT NULL,
  `product_id` int(255) NOT NULL,
  `quantity` bigint(255) NOT NULL,
  `p_date` date NOT NULL,
  `price_per_unit` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `type`, `product_id`, `quantity`, `p_date`, `price_per_unit`) VALUES
(1, 1, 10, 10, '2020-10-25', 40000),
(2, 0, 10, 3, '2020-10-27', 20),
(3, 0, 10, 2, '2020-11-01', 20),
(4, 0, 10, 2, '2020-11-01', 20),
(5, 0, 13, 3, '2020-11-01', 5000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `credited_products`
--
ALTER TABLE `credited_products`
  ADD UNIQUE KEY `product_id` (`product_id`),
  ADD KEY `creditor_id` (`creditor_id`);

--
-- Indexes for table `creditor_profile`
--
ALTER TABLE `creditor_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `current_inventory`
--
ALTER TABLE `current_inventory`
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `ordered_products`
--
ALTER TABLE `ordered_products`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `price_details`
--
ALTER TABLE `price_details`
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `product_group`
--
ALTER TABLE `product_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `retailer`
--
ALTER TABLE `retailer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `creditor_profile`
--
ALTER TABLE `creditor_profile`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `product_group`
--
ALTER TABLE `product_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `retailer`
--
ALTER TABLE `retailer`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `credited_products`
--
ALTER TABLE `credited_products`
  ADD CONSTRAINT `credited_products_ibfk_1` FOREIGN KEY (`creditor_id`) REFERENCES `creditor_profile` (`id`),
  ADD CONSTRAINT `credited_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `current_inventory`
--
ALTER TABLE `current_inventory`
  ADD CONSTRAINT `current_inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `ordered_products`
--
ALTER TABLE `ordered_products`
  ADD CONSTRAINT `ordered_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_details` (`id`),
  ADD CONSTRAINT `ordered_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`);

--
-- Constraints for table `price_details`
--
ALTER TABLE `price_details`
  ADD CONSTRAINT `price_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `product_group` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
