# Aura IG — Mobile AI Agent Wizard ✨

[![Deploy to GitHub Pages](https://github.com/DimaMinka/aura-ig-wizard/actions/workflows/deploy.yml/badge.svg)](https://github.com/DimaMinka/aura-ig-wizard/actions/workflows/deploy.yml)
[![Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-blue?style=flat&logo=github)](https://dimaminka.github.io/aura-ig-wizard/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Interactive **Mobile-First** web application (`390×844` viewport / `max-w-[430px]`) for managing Instagram engagement pods and peer-to-peer reciprocity in the luxurious **Rose Quartz & Champagne Gold** aesthetic.

Built from Google Stitch design system prototypes and mapped directly to backend modules of `ig-engagement-agent` (safety rate limiting in `safety_guard.py`, dual-tier queue in `fetch_telegram.py`, weekly reciprocity cards in `card_renderer.py`, and semantic ROI ranking in `chat_ranker.py`).

🌐 **Live Demo**: [dimaminka.github.io/aura-ig-wizard](https://dimaminka.github.io/aura-ig-wizard/)  
📦 **GitHub Repository**: [github.com/DimaMinka/aura-ig-wizard](https://github.com/DimaMinka/aura-ig-wizard)

---

## 📱 Screens & Workflows (English)

1. **✨ Wizard (Hub & Queue)**:
   - Actionable summary of the engagement queue (`Heavy` deep-engagement tasks vs `Light` like+bookmark tasks).
   - Human-in-the-loop (HITL) safe batch execution controls with temperature indicators (`GREEN`, `YELLOW`, `RED`).
   - 24-hour batch refresh, queue cleanup, and ready-to-use scenario cards.

2. **🚀 Seeding & AI (Post Pre-Flight)**:
   - Step-by-step Reels launch wizard with instant demo URL filling and automatic niche detection.
   - Interactive chat quota checklist with spam-filter warnings.
   - Counter-debt clearance widget to fulfill mutual obligations prior to posting.
   - Schedule selector: Immediate, peak engagement hours (19:30), or scheduled launch.

3. **💖 Reciprocity (Ghost Auditor)**:
   - Key reciprocity conversion metrics (Conversion Rate %, pending debts, returned engagement).
   - Filterable participant roster (All, Debtors, VIPs) with quick DM reminder actions.
   - High-fidelity **Rose Quartz & Champagne Gold** shareable card preview with 1-click PNG download.

4. **💎 Chats & Radar (ROI & Health)**:
   - Live account pacing rhythm meter (1-hour and 24-hour soft/hard limits).
   - Chat ROI leaderboard with vitality, reciprocity return rates, and priority badges (`ADMIN`, `VIP`, `Standard`).
   - Semantic conversation radar tracking admin scrutiny, topic clusters, and artificial engagement spikes.

5. **⚡ AI Assistant Bar & Response Drawer**:
   - Dynamic prompt input bar with tab-specific quick action chips.
   - Thinking-state drawer simulating multi-step reasoning before rendering formatted agent recommendations.
   - Real-time service mode switcher: **🧪 Mock Agent** (zero-setup offline demo) ↔ **⚡ Live Agent** (REST API connector).

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (custom `rose-gold` palette + Google Stitch design tokens)
- **Typography (100% Cyrillic & Latin support)**: `Playfair Display` (Headings) + `Manrope` (UI & Body)
- **Icons**: Google Material Symbols Outlined
- **Modular Quality Rules**: Hard constraint of $\le 140$ lines per file enforced by custom CI validator (`check-lines.mjs`)

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/DimaMinka/aura-ig-wizard.git
cd aura-ig-wizard

# Install dependencies
npm install

# Start development server
npm run dev

# Run line count constraint checks
npm run check:lines

# Build for production
npm run build
```

## 🌐 Deployment

The application automatically builds and deploys to GitHub Pages via GitHub Actions on every push to the `main` branch.

---

# Русская версия (Russian)

# Aura IG — Мобильный AI-Визард Взаимности ✨

Интерактивный **Mobile-First** мини-сайт (`390×844` / `max-w-[430px]`) для управления взаимной активностью в Instagram в эстетике **Rose Quartz & Champagne Gold**.

Создан на базе прототипов Google Stitch и интегрирован с архитектурой backend-агента `ig-engagement-agent` (контроль безопасности `safety_guard.py`, очередь `fetch_telegram.py`, открытки взаимности `card_renderer.py` и ROI-радар `chat_ranker.py`).

🌐 **Демо на GitHub Pages**: [dimaminka.github.io/aura-ig-wizard](https://dimaminka.github.io/aura-ig-wizard/)  
📦 **Репозиторий**: [github.com/DimaMinka/aura-ig-wizard](https://github.com/DimaMinka/aura-ig-wizard)

## 📱 Экраны и сценарии

1. **✨ Визард (Главный хаб)**:
   - Сводка очереди заданий (`Heavy` глубокая активность vs `Light` только лайк + закладка).
   - Управление безопасными пачками HITL с цветовой индикацией температуры (`GREEN`, `YELLOW`, `RED`).
   - Сбор за 24 часа, очистка хвостов и сетка быстрых сценариев.

2. **🚀 Посев & ИИ (Подготовка поста)**:
   - Пошаговый мастер подготовки Reels с быстрой вставкой демо-ссылки и определением ниши.
   - Проверка квот чатов на спам-фильтры и правила активности.
   - Виджет закрытия встречных долгов перед отправкой своего поста.
   - Выбор времени старта: мгновенно, в пик онлайна (19:30) или по расписанию.

3. **💖 Взаимность (Ghost Auditor)**:
   - Метрики отдачи взаимности (CR%, долги, закрытые обязательства).
   - Фильтруемый список участников (Все, Должники, VIP) с кнопками напоминания в ЛС.
   - Брендовая карточка-открытка в палитре Rose Quartz & Champagne Gold со скачиванием PNG.

4. **💎 Чаты & Радар (ROI и здоровье аккаунта)**:
   - Ритм аккаунта с детальными лимитами 1ч и 24ч для защиты от теневого бана.
   - ROI-рейтинг чатов с индикаторами отдачи и приоритетами (`ADMIN`, `VIP`, `Обычный`).
   - Семантический радар тем с детекцией накруток и предупреждениями от модераторов.

5. **⚡ Контекстный AI Prompt Bar и шторка ответов**:
   - Инпут с быстрыми чипсами под контекст каждого экрана.
   - Анимированная шторка мышления агента с промежуточными этапами анализа.
   - Переключение на лету между **🧪 Мок-режимом** и **⚡ Live API**.

## 🛠 Технологический стек

- **Фреймворк**: React 19 + TypeScript + Vite
- **Стилизация**: Tailwind CSS (кастомная палитра `rose-gold` + точные дизайн-токены Stitch)
- **Шрифты с 100% поддержкой кириллицы**: `Playfair Display` (заголовки) + `Manrope` (интерфейс)
- **Иконки**: Google Material Symbols Outlined
- **Архитектура**: Переключение между `MockAgentService` и `LiveAgentService`, лимит $\le 140$ строк на файл.

## 🚀 Локальный запуск

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Проверка лимитов строк (<= 120 строк на компонент)
npm run check:lines

# Сборка проекта
npm run build
```

## 🌐 Развёртывание

Сайт автоматически собирается и публикуется на GitHub Pages через GitHub Actions при пуше в ветку `main`.
