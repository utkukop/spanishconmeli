# spanishconmeli 🇪🇸

Spanish Language Learning Platform inspired by *spanishbutreal.com*, featuring an interactive conversational CEFR level assessment quiz, course showcase, podcast & resources library, and a secret standalone Backoffice CMS.

---

## 🚀 Tech Stack (Kullanılan Teknolojiler)

* **Language**: **TypeScript** (Strict Type Safety)
* **Frontend Framework**: **React 19**
* **Build Tool & Bundler**: **Vite 6**
* **Styling**: **Tailwind CSS v4** (`@tailwindcss/vite`)
* **Animation**: **Motion** (Framer Motion)
* **Icons**: **Lucide React**
* **Testing**: **Node.js Test Runner** (`node:test`)
* **Persistence**: LocalStorage with Draft/Live sync & JSON import/export

---

## 📁 Project Structure (Dosya Yapısı)

```text
├── index.html                   # HTML5 Entry Point with SEO, OpenGraph & Schema.org JSON-LD
├── package.json                 # Dependencies & Scripts
├── tsconfig.json                # TypeScript Configuration
├── vite.config.ts               # Vite Configuration (React + Tailwind v4 plugins)
├── src/
│   ├── main.tsx                 # React DOM Root
│   ├── App.tsx                  # Main Router (Public Site vs Isolated Backoffice)
│   ├── index.css                # Global Tailwind CSS Entry Point
│   ├── types/
│   │   └── index.ts             # TypeScript Interfaces (SiteConfig, Course, Quiz, Lead, etc.)
│   ├── context/
│   │   └── CMSContext.tsx       # Draft vs Published Reactive State & Backoffice Auth
│   ├── data/
│   │   └── initialContent.ts    # Seed Data (Courses, Quiz questions, Testimonials, Resources)
│   ├── utils/
│   │   ├── quizScorer.ts        # Pure diagnostic algorithm for CEFR Level calculation
│   │   └── quizScorer.test.ts   # Unit tests for scoring & email validation
│   ├── assets/
│   │   └── images/              # High-resolution generated images
│   └── components/
│       ├── Navbar.tsx           # Responsive Header with Mobile Menu & Announcement Bar
│       ├── Hero.tsx             # High-converting Hero section with Social Proof
│       ├── MethodologySection.tsx # Real Spanish vs Textbook side-by-side comparison
│       ├── CoursesSection.tsx   # Course cards with currency selector, badge & syllabus
│       ├── QuizPage.tsx         # Interactive Level Quiz with audio speech synthesis
│       ├── ResourcesSection.tsx # Podcast audio player demo & downloadable PDF guides
│       ├── TestimonialsSection.tsx # Authentic student reviews & outcomes
│       ├── AboutSection.tsx     # Teacher Meli bio & social channels
│       ├── Footer.tsx           # Newsletter capture, links & legal copyright
│       └── BackofficePage.tsx   # Isolated English CMS Panel (password-protected)
```

---

## 🛠️ Local Development (Yerel Çalıştırma)

1. **Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   ```

2. **Geliştirme Sunucusunu Başlatın**:
   ```bash
   npm run dev
   ```
   Tarayıcınızda `http://localhost:3000` adresine gidin.

3. **Birim Testlerini Çalıştırın**:
   ```bash
   npm test
   ```

4. **Üretim için Derleyin (Build)**:
   ```bash
   npm run build
   ```

---

## 🔐 Backoffice CMS (Yönetim Paneli Erişimi)

Yönetim paneli genel kullanıcılardan tamamen gizlidir ve genel sitede hiçbir buton barındırmaz.

* **URL Üzerinden Erişim**: `http://localhost:3000/#backoffice` veya `http://localhost:3000/backoffice`
* **Klavye Kısayolu**: `Ctrl + Shift + A` (Mac: `Cmd + Shift + A`)
* **Varsayılan Yönetici Şifresi**: `meli2026`

Panodan yapılan tüm düzenlemeler taslak olarak tutulur ve **"Save & Publish Live"** butonuna basıldığında sitede anında canlıya geçer.

---

## 🐙 GitHub'a Yükleme Adımları

1. Bilgisayarınızda proje klasöründe terminali açın:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: spanishconmeli website & backoffice CMS"
   ```

2. GitHub'da `spanishconmeli` adında yeni bir boş repository (depo) oluşturun.

3. Repository'yi yerel projenize bağlayın ve yükleyin:
   ```bash
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/spanishconmeli.git
   git push -u origin main
   ```

---

## 🌐 Canlıya Alma (Deployment)

* **Vercel / Netlify**: GitHub deponuzu bağladığınız anda framework olarak Vite otomatik algılanır ve siteniz saniyeler içinde SSL sertifikalı olarak yayına girer. Özel domain (`spanishconmeli.com`) tek tıkla eklenebilir.
* **Google Cloud Run**: Docker veya Vite build çıktısı ile doğrudan sunucusuz olarak çalıştırılabilir.
