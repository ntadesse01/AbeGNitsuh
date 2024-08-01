-- CreateTable
CREATE TABLE `customer_identifier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_email` VARCHAR(191) NOT NULL,
    `customer_phone_number` VARCHAR(191) NOT NULL,
    `customer_added_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `customer_hash` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `customer_identifier_customer_email_key`(`customer_email`),
    UNIQUE INDEX `customer_identifier_customer_phone_number_key`(`customer_phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `customer_first_name` VARCHAR(191) NOT NULL,
    `customer_last_name` VARCHAR(191) NOT NULL,
    `active_customer_status` INTEGER NOT NULL,

    UNIQUE INDEX `customer_info_customer_id_key`(`customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_vehicle_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `vehicle_year` INTEGER NOT NULL,
    `vehicle_make` VARCHAR(191) NOT NULL,
    `vehicle_model` VARCHAR(191) NOT NULL,
    `vehicle_type` VARCHAR(191) NOT NULL,
    `vehicle_mileage` INTEGER NOT NULL,
    `vehicle_tag` VARCHAR(191) NOT NULL,
    `vehicle_color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_role_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `company_roles_company_role_name_key`(`company_role_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `common_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_name` VARCHAR(191) NOT NULL,
    `service_description` LONGTEXT NOT NULL,

    UNIQUE INDEX `common_services_service_name_key`(`service_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_email` VARCHAR(191) NOT NULL,
    `active_employee` VARCHAR(191) NOT NULL,
    `added_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `employee_employee_email_key`(`employee_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `employee_first_name` VARCHAR(191) NOT NULL,
    `employee_last_name` VARCHAR(191) NOT NULL,
    `employee_phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `employee_info_employee_id_key`(`employee_id`),
    UNIQUE INDEX `employee_info_employee_phone_key`(`employee_phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_pass` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `employee_password_hashed` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `employee_pass_employee_id_key`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `company_role_id` INTEGER NOT NULL,

    UNIQUE INDEX `employee_role_employee_id_key`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `vehicle_id` INTEGER NOT NULL,
    `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `active_order` INTEGER NOT NULL,
    `order_hash` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `order_total_price` INTEGER NOT NULL,
    `estimated_completion_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completion_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `additional_request` VARCHAR(191) NULL,
    `notes_for_internal_use` VARCHAR(191) NULL,
    `notes_for_customer` VARCHAR(191) NULL,
    `additional_requests_completed` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,
    `service_completed` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `order_status` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customer_info` ADD CONSTRAINT `customer_info_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_vehicle_info` ADD CONSTRAINT `customer_vehicle_info_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_info` ADD CONSTRAINT `employee_info_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_pass` ADD CONSTRAINT `employee_pass_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_role` ADD CONSTRAINT `employee_role_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `customer_vehicle_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_info` ADD CONSTRAINT `order_info_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_services` ADD CONSTRAINT `order_services_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_services` ADD CONSTRAINT `order_services_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `common_services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_status` ADD CONSTRAINT `order_status_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
