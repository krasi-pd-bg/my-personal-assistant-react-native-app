# 🤖 Personal Assistant - React Native App

Мобилна апликация за управление на задачи, напомняния и събития с интелигентна система за известяване.

---

## 📊 Project Status

### Current Phase: **Фаза 1 - Setup & Basic Structure**
**Прогрес:** 10% ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜

### Last Updated: [15.01'2026]

---

## ✅ Completed Tasks

### Setup & Initialization
- [x] Проектът е създаден с Expo
- [x] Git repository инициализиран
- [x] README файл създаден
- [x] Основна структура на папките създадена
- [x] Package dependencies инсталирани

### Phase 1 - Basic Structure
- [x] Създадени constants и utils файлове
- [x] Storage service имплементиран
- [ ] Navigation setup (Stack, Tabs)
- [x] HomeScreen базов layout
- [x] ReminderCard компонент

### Phase 2 - Core Functionality
- [ ] Add Reminder screen
- [ ] Edit Reminder screen
- [ ] Delete functionality
- [ ] Category selector
- [ ] Date/Time pickers
- [ ] Basic notification setup

### Phase 3 - Advanced Features
- [ ] Advanced notifications (преди събития)
- [ ] Recurrence логика
- [ ] Calendar view
- [ ] Snooze функционалност
- [ ] Filter и search

### Phase 4 - Polish & Extras
- [ ] Dashboard със статистики
- [ ] Settings screen
- [ ] Dark mode (optional)
- [ ] UI/UX improvements
- [ ] Testing на устройство

---

## 📁 Current Project Structure

```
personal-assistant/
├── App.js
├── package.json
├── README.md
└── app.json

TODO: Създай следната структура - създадена е.
├── src/
│   ├── screens/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   └── utils/
```

---

## 🔧 Technologies & Dependencies

### Core
- **React Native** via Expo
- **React Navigation** - Navigation
- **AsyncStorage** - Local storage
- **Notifee** - Push notifications

### Planned Dependencies
```json
{
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@react-native-async-storage/async-storage": "^1.21.0",
  "@notifee/react-native": "^7.8.2",
  "react-native-vector-icons": "^10.0.3",
  "react-native-calendars": "^1.1302.0",
  "@react-native-community/datetimepicker": "^7.6.2",
  "react-native-modal": "^13.0.1",
  "date-fns": "^3.0.0"
}
```

**Status:** ❌ Not installed yet - инсталирани са.

---

## 🎯 Next Steps

1. **Създай папковата структура:** - 
   ```bash
   mkdir -p src/{screens,components,services,hooks,context,utils}
   mkdir -p src/screens/{Home,Reminders,Calendar,Categories,Settings}
   mkdir -p src/components/{common,reminders,modals}
   mkdir -p src/services/{storage,notifications,dateTime}
   ```

2. **Инсталирай dependencies:** - инсталирани са.
   ```bash
   npx expo install @react-navigation/native @react-navigation/stack
   npx expo install @react-native-async-storage/async-storage
   npx expo install react-native-vector-icons
   ```

3. **Създай constants.js файл** в `src/utils/` - създаден е.

4. **Създай reminderStorage.js** в `src/services/storage/` - създаден е.

5. **Тествай основния navigation flow**

---

## 📝 Development Notes

### Session 1 (ДАТА)
- Проектът стартиран с Expo
- Git repository създадено
- README файл създаден
- **Next:** Създаване на папкова структура - създадена е.

### Session 2 (ДАТА)
- TODO: Добави бележки тук

### Session 3 (ДАТА)
- TODO: Добави бележки тук

---

## 🐛 Known Issues

- Няма засечени проблеми засега

---

## 💡 Ideas & Future Features

### Priority 1 (Must Have)
- ✅ Basic CRUD за напомняния
- ✅ Push notifications
- ✅ Категории и приоритети
- ✅ Calendar view

### Priority 2 (Should Have)
- 🔄 Recurring reminders
- 🔄 Snooze функционалност
- 🔄 Search & filter
- 🔄 Statistics

### Priority 3 (Nice to Have)
- ⏳ Dark mode
- ⏳ Custom categories
- ⏳ Backup/Restore
- ⏳ Cloud sync (requires backend)
- ⏳ Multi-language support
- ⏳ Widget support

---

## 🚀 Running the Project

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

---

## 📱 Testing Checklist

- [ ] Notifications работят на физическо устройство (iOS)
- [ ] Notifications работят на физическо устройство (Android)
- [ ] AsyncStorage запазва данни правилно
- [ ] App работи offline
- [ ] Всички екрани са responsive
- [ ] Navigation flow е smooth
- [ ] Няма memory leaks

---

## 🤝 Contributing Notes

### Code Style
- Използвай functional components
- Използвай hooks където е възможно
- Коментирай сложна логика
- Именувай променливи и функции описателно

### Git Workflow
```bash
# Нов feature
git checkout -b feature/название-на-feature
git commit -m "Add: описание на промените"
git push origin feature/название-на-feature

# Bug fix
git checkout -b fix/описание-на-бъга
```

### Commit Message Format
- `Add:` - Нова функционалност
- `Update:` - Промяна в съществуваща функционалност
- `Fix:` - Bug fix
- `Style:` - UI/UX промени
- `Refactor:` - Code refactoring
- `Docs:` - Документация

---

## 📞 Questions & Support

За въпроси или помощ, добави коментар в следващата сесия с Claude.

---

**Версия:** 0.1.0  
**Последна актуализация:** [15.01'2026]  
**Разработчик:** [krasi_pd_bg]