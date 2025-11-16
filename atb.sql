-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: 68.183.186.37    Database: balidiving
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('adopt-the-blue-cache-3f3d80b4929c71a6d9cfaf055325855c','i:1;',1763163401),('adopt-the-blue-cache-3f3d80b4929c71a6d9cfaf055325855c:timer','i:1763163401;',1763163401),('adopt-the-blue-cache-4e09e2b1063a14833a52d22faacf4b01','i:1;',1763153132),('adopt-the-blue-cache-4e09e2b1063a14833a52d22faacf4b01:timer','i:1763153132;',1763153132),('adopt-the-blue-cache-5dbce1a900d7fe0befcfa616b972b0bb','i:1;',1763163405),('adopt-the-blue-cache-5dbce1a900d7fe0befcfa616b972b0bb:timer','i:1763163405;',1763163405),('adopt-the-blue-cache-a8cb3036ede7d6a5c4df9a9f68c04a2f','i:1;',1763163414),('adopt-the-blue-cache-a8cb3036ede7d6a5c4df9a9f68c04a2f:timer','i:1763163414;',1763163414),('adopt-the-blue-cache-c5601221289fc64a9b79d7a04427f685','i:1;',1763163483),('adopt-the-blue-cache-c5601221289fc64a9b79d7a04427f685:timer','i:1763163483;',1763163483),('adopt-the-blue-cache-e5c7016bb943cb9a9b37ffe8f71fabbd','i:1;',1763126362),('adopt-the-blue-cache-e5c7016bb943cb9a9b37ffe8f71fabbd:timer','i:1763126362;',1763126362),('adopt-the-blue-cache-superadmin@gmail.com|104.23.175.163','i:1;',1763163405),('adopt-the-blue-cache-superadmin@gmail.com|104.23.175.163:timer','i:1763163405;',1763163405),('adopt-the-blue-cache-superadmin@gmail.com|162.158.88.10','i:1;',1763163414),('adopt-the-blue-cache-superadmin@gmail.com|162.158.88.10:timer','i:1763163414;',1763163414),('adopt-the-blue-cache-superadmin@gmail.com|172.70.188.70','i:1;',1763163401),('adopt-the-blue-cache-superadmin@gmail.com|172.70.188.70:timer','i:1763163401;',1763163401);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donasi`
--

DROP TABLE IF EXISTS `donasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donasi` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `kampanye_id` bigint unsigned NOT NULL,
  `order_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `snap_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jumlah` decimal(15,2) NOT NULL,
  `metode_pembayaran` enum('transfer_bank','ewallet','midtrans') COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_transaksi` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','berhasil','gagal') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `nama_donatur` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_donatur` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_telepon_donatur` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pesan` text COLLATE utf8mb4_unicode_ci,
  `is_anonim` tinyint(1) NOT NULL DEFAULT '0',
  `pesan_dukungan` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `donasi_id_transaksi_unique` (`id_transaksi`),
  UNIQUE KEY `donasi_order_id_unique` (`order_id`),
  KEY `donasi_user_id_foreign` (`user_id`),
  KEY `donasi_status_index` (`status`),
  KEY `donasi_kampanye_id_status_index` (`kampanye_id`,`status`),
  CONSTRAINT `donasi_kampanye_id_foreign` FOREIGN KEY (`kampanye_id`) REFERENCES `kampanye` (`id`) ON DELETE CASCADE,
  CONSTRAINT `donasi_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donasi`
--

LOCK TABLES `donasi` WRITE;
/*!40000 ALTER TABLE `donasi` DISABLE KEYS */;
INSERT INTO `donasi` VALUES (1,5,2,'DONATE-ULSLT5R3IQ','b13966c9-a515-4c30-b0d1-3ee90adb8b17',50000.00,'midtrans',NULL,'berhasil','Anonymous','ahmad@gmail.com',NULL,NULL,1,NULL,'2025-11-12 10:25:15','2025-11-12 10:25:40'),(2,1,1,'DONATE-Z9AHUBSJ1Z','07871e0a-6173-4a00-8c51-eacea74ca2e9',10000.00,'midtrans',NULL,'gagal','Super Admin','superadmin@atb.com','085817510527',NULL,0,NULL,'2025-11-13 08:39:21','2025-11-13 09:00:01'),(3,1,1,'DONATE-PRDB944YCH','e25af4f7-d57f-4b5c-9d1e-f3e5afe87c1c',50000.00,'midtrans',NULL,'gagal','Super Admin','superadmin@atb.com','0817510527',NULL,0,NULL,'2025-11-13 08:43:19','2025-11-13 08:59:35'),(4,1,1,'DONATE-LI4T6XGI5C','7b0d4084-50ea-497b-b545-44945430810e',250000.00,'midtrans',NULL,'gagal','Super Admin','superadmin@atb.com','085817510527',NULL,0,NULL,'2025-11-14 20:44:59','2025-11-14 21:01:05');
/*!40000 ALTER TABLE `donasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `max_participants` int DEFAULT NULL,
  `registered_participants` int NOT NULL DEFAULT '0',
  `status` enum('upcoming','ongoing','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'upcoming',
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `events_slug_unique` (`slug`),
  KEY `events_user_id_foreign` (`user_id`),
  CONSTRAINT `events_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,1,'Beach Cleanup Day - Pantai Kuta','beach-cleanup-day-pantai-kuta','Mari bergabung dalam aksi bersih-bersih pantai untuk melindungi ekosistem laut kita! ?\n\nKegiatan:\n- Pembersihan sampah plastik di sepanjang pantai\n- Edukasi tentang dampak sampah terhadap kehidupan laut\n- Workshop daur ulang sampah plastik\n- Menanam mangrove\n\nYang perlu dibawa:\n- Sarung tangan\n- Topi/payung\n- Air minum\n- Semangat untuk lingkungan!\n\nMakanan dan minuman akan disediakan untuk semua peserta.','https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&h=600&fit=crop','Pantai Kuta, Bali','https://maps.google.com/?q=Pantai+Kuta+Bali','2025-11-19 08:00:00','2025-11-19 12:00:00',100,67,'upcoming',1,'2025-11-12 10:09:25','2025-11-12 10:09:25'),(2,1,'Coral Reef Conservation Workshop','coral-reef-conservation-workshop','Workshop intensif tentang konservasi terumbu karang dan teknik rehabilitasi.\n\nMateri Workshop:\n- Pentingnya terumbu karang bagi ekosistem laut\n- Ancaman terhadap terumbu karang\n- Teknik transplantasi karang\n- Monitoring kesehatan terumbu karang\n- Praktik langsung di laut (untuk peserta bersertifikat diving)\n\nInstruktur:\n- Dr. Marine Biologist dari Institut Oseanografi\n- Praktisi konservasi laut berpengalaman\n\nSertifikat akan diberikan untuk semua peserta.','https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop','Pusat Konservasi Laut, Jakarta','https://maps.google.com/?q=Jakarta','2025-11-26 09:00:00','2025-11-26 16:00:00',50,32,'upcoming',1,'2025-11-12 10:09:25','2025-11-12 10:09:25'),(3,1,'Ocean Conservation Seminar','ocean-conservation-seminar','Seminar nasional tentang pentingnya konservasi laut dan masa depan ekosistem laut Indonesia.\n\nAgenda:\n- Keynote speech dari ahli kelautan internasional\n- Panel diskusi dengan para pemangku kepentingan\n- Presentasi hasil penelitian terkini\n- Networking session\n- Exhibition teknologi konservasi laut\n\nPembicara:\n- Prof. Dr. Ahli Kelautan dari berbagai universitas terkemuka\n- Praktisi konservasi dari NGO internasional\n- Perwakilan Kementerian Kelautan dan Perikanan\n\nGratis untuk pelajar dan mahasiswa!','https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop','Auditorium Universitas Indonesia, Depok','https://maps.google.com/?q=UI+Depok','2025-12-03 08:00:00','2025-12-03 17:00:00',500,234,'upcoming',1,'2025-11-12 10:09:25','2025-11-12 10:09:25'),(4,1,'Underwater Photography Competition','underwater-photography-competition','Kompetisi fotografi bawah laut untuk meningkatkan awareness tentang keindahan dan pentingnya ekosistem laut.\n\nKategori Lomba:\n- Marine Life Photography\n- Coral Reef Beauty\n- Conservation Message\n- Underwater Landscape\n\nHadiah Total: Rp 50.000.000!\n\nJuara 1: Rp 15.000.000 + Peralatan diving\nJuara 2: Rp 10.000.000 + Underwater camera\nJuara 3: Rp 5.000.000 + Diving package\n\nPeserta:\n- Fotografer profesional dan amatir\n- Wajib memiliki sertifikat diving\n- Foto diambil di perairan Indonesia\n\nPendaftaran online melalui website kami.','https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop','Online Registration - Various Diving Spots',NULL,'2025-12-12 00:00:00','2026-02-10 23:59:00',NULL,145,'upcoming',0,'2025-11-12 10:09:25','2025-11-12 10:09:25'),(5,1,'Marine Life Education for Kids','marine-life-education-for-kids','Program edukasi interaktif tentang kehidupan laut untuk anak-anak usia 6-12 tahun.\n\nKegiatan:\n- Mengenal berbagai jenis ikan dan hewan laut\n- Menggambar dan mewarnai hewan laut\n- Menonton film dokumenter kehidupan laut\n- Kunjungan ke akuarium\n- Games dan kuis berhadiah\n- Craft membuat kerajinan dari barang bekas\n\nFasilitas:\n- Lunch box\n- Goodie bag\n- Sertifikat\n- Dokumentasi\n\nOrang tua dapat mendampingi tanpa biaya tambahan.','https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop','Jakarta Aquarium, Neo Soho Mall','https://maps.google.com/?q=Jakarta+Aquarium','2025-12-10 10:00:00','2025-12-10 14:00:00',80,45,'upcoming',0,'2025-11-12 10:09:25','2025-11-12 10:09:25'),(6,1,'Mangrove Planting Campaign','mangrove-planting-campaign','Aksi tanam mangrove massal untuk melindungi garis pantai dan ekosistem pesisir.\n\nTarget:\n- Menanam 5.000 bibit mangrove\n- Membuat area konservasi mangrove seluas 2 hektar\n- Edukasi masyarakat lokal tentang pentingnya mangrove\n\nBenefits Mangrove:\n- Mencegah abrasi pantai\n- Habitat berbagai jenis ikan dan kepiting\n- Menyerap karbon lebih baik dari hutan tropis\n- Melindungi dari tsunami dan badai\n\nKerja sama dengan:\n- Pemerintah Daerah\n- Komunitas nelayan lokal\n- NGO konservasi\n\nSetiap peserta akan mendapat sertifikat dan 1 pohon mangrove dengan nama masing-masing!','https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop','Pantai Indah Kapuk, Jakarta Utara','https://maps.google.com/?q=PIK+Jakarta','2025-12-17 07:00:00','2025-12-17 11:00:00',200,89,'upcoming',1,'2025-11-12 10:09:25','2025-11-12 10:09:25');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kampanye`
--

DROP TABLE IF EXISTS `kampanye`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kampanye` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `kategori_id` bigint unsigned NOT NULL,
  `judul` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_dana` decimal(15,2) NOT NULL,
  `dana_terkumpul` decimal(15,2) NOT NULL DEFAULT '0.00',
  `tanggal_mulai` date NOT NULL,
  `tanggal_berakhir` date NOT NULL,
  `gambar_utama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('draft','aktif','selesai','ditolak') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kampanye_slug_unique` (`slug`),
  KEY `kampanye_user_id_foreign` (`user_id`),
  KEY `kampanye_status_index` (`status`),
  KEY `kampanye_tanggal_berakhir_index` (`tanggal_berakhir`),
  KEY `kampanye_kategori_id_status_index` (`kategori_id`,`status`),
  CONSTRAINT `kampanye_kategori_id_foreign` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_kampanye` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `kampanye_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kampanye`
--

LOCK TABLES `kampanye` WRITE;
/*!40000 ALTER TABLE `kampanye` DISABLE KEYS */;
INSERT INTO `kampanye` VALUES (1,1,3,'Coral Restoration Project','coral-restoration-project','Help restore coral reefs in endangered marine areas. Coral reefs are among the most diverse ecosystems on Earth, providing homes to 25% of all marine species. This project aims to restore 1000 square meters of damaged coral reefs using advanced marine biology techniques and community involvement.',50000000.00,0.00,'2025-10-23','2025-12-22','/images/coral-1.jpeg','aktif','2025-11-12 10:09:25','2025-11-12 10:09:25'),(2,1,3,'Help Relocate the Coral','help-relocate-the-coral','Support coral relocation efforts to safer waters. Due to rising ocean temperatures and pollution, many coral colonies need to be moved to healthier environments. This campaign will fund the equipment, marine biologists, and boat operations needed for safe coral transplantation.',75000000.00,50000.00,'2025-11-07','2026-01-06','/images/coral-2.jpeg','aktif','2025-11-12 10:09:25','2025-11-12 10:25:40'),(3,1,1,'Save Coral Reefs','save-coral-reefs','Protect existing coral reef ecosystems from further damage. Coral reefs are dying at an alarming rate. This project focuses on establishing marine protected areas, educating local communities, and implementing sustainable fishing practices to preserve our remaining coral reefs.',30000000.00,0.00,'2025-10-08','2026-02-15','/images/sdm-1-.jpg','aktif','2025-11-12 10:09:25','2025-11-12 10:09:25'),(4,1,3,'Help Rebuild Coral Reefs','help-rebuild-coral-reefs','Rebuild damaged coral reef systems using innovative techniques. This large-scale project will create artificial reef structures, transplant healthy coral fragments, and monitor the recovery progress over 3 years. Your donation will directly contribute to ocean ecosystem restoration.',100000000.00,0.00,'2025-10-13','2026-02-20','/images/sdm-2.jpg','aktif','2025-11-12 10:09:25','2025-11-12 10:09:25'),(5,1,2,'Beach Cleanup Initiative','beach-cleanup-initiative','Join our monthly beach cleanup campaign to remove plastic waste and debris from our coastal areas. Every piece of trash removed means a safer environment for marine life and cleaner beaches for our communities.',20000000.00,0.00,'2025-11-02','2026-01-31','/images/coral-1.jpeg','aktif','2025-11-12 10:09:25','2025-11-12 10:09:25'),(6,1,5,'Sea Turtle Conservation','sea-turtle-conservation','Protect endangered sea turtle nesting sites and hatchlings. This program includes beach patrols during nesting season, hatchery protection, and education programs for local communities about the importance of sea turtle conservation.',40000000.00,0.00,'2025-10-28','2026-01-26','/images/coral-2.jpeg','aktif','2025-11-12 10:09:25','2025-11-12 10:09:25');
/*!40000 ALTER TABLE `kampanye` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori_kampanye`
--

DROP TABLE IF EXISTS `kategori_kampanye`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategori_kampanye` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kategori_kampanye_nama_unique` (`nama`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori_kampanye`
--

LOCK TABLES `kategori_kampanye` WRITE;
/*!40000 ALTER TABLE `kategori_kampanye` DISABLE KEYS */;
INSERT INTO `kategori_kampanye` VALUES (1,'Konservasi Laut','Kampanye untuk melindungi dan melestarikan ekosistem laut dan kehidupan laut','2025-11-12 10:09:24','2025-11-12 10:09:24'),(2,'Pembersihan Pantai','Kampanye pembersihan pantai dari sampah plastik dan polusi laut','2025-11-12 10:09:24','2025-11-12 10:09:24'),(3,'Terumbu Karang','Kampanye restorasi dan perlindungan terumbu karang','2025-11-12 10:09:24','2025-11-12 10:09:24'),(4,'Edukasi Lingkungan','Kampanye edukasi dan kesadaran lingkungan kepada masyarakat','2025-11-12 10:09:24','2025-11-12 10:09:24'),(5,'Satwa Laut','Kampanye perlindungan satwa laut yang terancam punah','2025-11-12 10:09:24','2025-11-12 10:09:24'),(6,'Polusi Laut','Kampanye pencegahan dan penanggulangan polusi laut','2025-11-12 10:09:24','2025-11-12 10:09:24');
/*!40000 ALTER TABLE `kategori_kampanye` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `komentar`
--

DROP TABLE IF EXISTS `komentar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `komentar` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kampanye_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `komentar` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('terlihat','tersembunyi') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'terlihat',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `komentar_kampanye_id_foreign` (`kampanye_id`),
  KEY `komentar_user_id_foreign` (`user_id`),
  CONSTRAINT `komentar_kampanye_id_foreign` FOREIGN KEY (`kampanye_id`) REFERENCES `kampanye` (`id`) ON DELETE CASCADE,
  CONSTRAINT `komentar_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `komentar`
--

LOCK TABLES `komentar` WRITE;
/*!40000 ALTER TABLE `komentar` DISABLE KEYS */;
/*!40000 ALTER TABLE `komentar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_08_26_100418_add_two_factor_columns_to_users_table',1),(5,'2025_11_10_082823_create_profil_pengguna_table',1),(6,'2025_11_10_082847_create_kategori_kampanye_table',1),(7,'2025_11_10_082854_create_kampanye_table',1),(8,'2025_11_10_082903_create_donasi_table',1),(9,'2025_11_10_083049_create_komentar_table',1),(10,'2025_11_10_083847_create_permission_tables',1),(11,'2025_11_10_092225_create_events_table',1),(12,'2025_11_10_094437_add_midtrans_fields_to_donasi_table',1),(13,'2025_11_10_095924_update_metode_pembayaran_in_donasi_table',1),(14,'2025_11_10_100127_make_id_transaksi_nullable_in_donasi_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(2,'App\\Models\\User',2),(4,'App\\Models\\User',3),(4,'App\\Models\\User',4),(4,'App\\Models\\User',5);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'campaign.create','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(2,'campaign.read','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(3,'campaign.update','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(4,'campaign.delete','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(5,'user.create','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(6,'user.read','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(7,'user.update','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(8,'user.delete','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(9,'user.verify','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(10,'donation.create','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(11,'donation.read','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(12,'donation.update','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(13,'category.create','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(14,'category.read','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(15,'category.update','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(16,'category.delete','web','2025-11-12 10:09:23','2025-11-12 10:09:23'),(17,'report.read','web','2025-11-12 10:09:24','2025-11-12 10:09:24'),(18,'report.export','web','2025-11-12 10:09:24','2025-11-12 10:09:24');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profil_pengguna`
--

DROP TABLE IF EXISTS `profil_pengguna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profil_pengguna` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `nomor_telepon` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `foto_profil` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profil_pengguna_user_id_foreign` (`user_id`),
  CONSTRAINT `profil_pengguna_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profil_pengguna`
--

LOCK TABLES `profil_pengguna` WRITE;
/*!40000 ALTER TABLE `profil_pengguna` DISABLE KEYS */;
INSERT INTO `profil_pengguna` VALUES (1,1,'081234567890','Jakarta, Indonesia',NULL,'2025-11-12 10:09:24','2025-11-12 10:09:24'),(2,2,'081234567891','Bali, Indonesia',NULL,'2025-11-12 10:09:25','2025-11-12 10:09:25'),(3,3,'081234567892','Surabaya, Indonesia',NULL,'2025-11-12 10:09:25','2025-11-12 10:09:25'),(4,4,'081234567893','Denpasar, Bali',NULL,'2025-11-12 10:09:25','2025-11-12 10:09:25');
/*!40000 ALTER TABLE `profil_pengguna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(1,2),(2,2),(3,2),(4,2),(6,2),(7,2),(9,2),(11,2),(12,2),(13,2),(14,2),(15,2),(16,2),(17,2),(18,2),(1,3),(2,3),(3,3),(11,3),(17,3),(2,4),(10,4),(11,4);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'super-admin','web','2025-11-12 10:09:24','2025-11-12 10:09:24'),(2,'admin','web','2025-11-12 10:09:24','2025-11-12 10:09:24'),(3,'fundraiser','web','2025-11-12 10:09:24','2025-11-12 10:09:24'),(4,'donor','web','2025-11-12 10:09:24','2025-11-12 10:09:24');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('QoJGV3ENsfAjNuHYnJ2KDEH15Hxb1L1RNxksYu4I',NULL,'172.70.92.145','Mozilla/5.0 (iPhone; CPU iPhone OS 15_8_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.6 Mobile/15E148 Safari/604.1','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUE9UcmczVDZnaHE0RndtNWQ5RmNNZGUwYzRRTVJSMGZsRjVKb3VPRCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cHM6Ly9kb25hdGlvbi5iYWxpZGl2aW5nLm15LmlkL2Rhc2hib2FyZCI7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjM5OiJodHRwczovL2RvbmF0aW9uLmJhbGlkaXZpbmcubXkuaWQvbG9naW4iO3M6NToicm91dGUiO3M6NToibG9naW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1763246143);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Super Admin','superadmin@atb.com','2025-11-12 10:09:24','$2y$12$KsTYT10XRmSFLLQ9qS4V/eOH..iYeNf7jZ64a7dWWZqYUu.xKLKDO',NULL,NULL,NULL,NULL,'2025-11-12 10:09:24','2025-11-12 10:09:24'),(2,'Admin Adopt the Blue','admin@atb.com','2025-11-12 10:09:24','$2y$12$BZzMcscXcFRqBaMRNmS7Ju7LKLQ68NUQkaDnSyjv7PFUd6ZMhqbW2',NULL,NULL,NULL,NULL,'2025-11-12 10:09:24','2025-11-12 10:09:24'),(3,'John Donor','donor@atb.com','2025-11-12 10:09:25','$2y$12$jHccbVHm84160RBH2hHllugbxgnmjXHyCG6kPQgzUFozHOzDbmo5u',NULL,NULL,NULL,NULL,'2025-11-12 10:09:25','2025-11-12 10:09:25'),(4,'Jane Smith','jane@atb.com','2025-11-12 10:09:25','$2y$12$auhiufgPUTBtOV97Xd93kuoUZV9hpkvJO.l8c0WO9HdqKOQF0m6me',NULL,NULL,NULL,NULL,'2025-11-12 10:09:25','2025-11-12 10:09:25'),(5,'Ahmad','ahmad@gmail.com','2025-11-12 10:26:42','$2y$12$L2UgCGg2A9aNHcWRT7lZTOpoT4DDXBnwOYzeUYMMIjZ7wHinCpaoG',NULL,NULL,NULL,NULL,'2025-11-12 10:25:00','2025-11-12 10:26:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-16 13:53:51
