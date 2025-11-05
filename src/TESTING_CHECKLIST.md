# Unmutte Platform - Testing Checklist ✅

## Pre-Launch Testing Guide

Test each feature before going live to ensure everything works perfectly.

---

## 🏠 Homepage Testing

- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] "Start Talking Now" button opens AI chat
- [ ] "Learn More" button navigates to About page
- [ ] All feature cards display correctly
- [ ] Testimonials section loads
- [ ] Quick Tips section shows
- [ ] Footer links work
- [ ] Dark mode toggle works
- [ ] Mobile responsive design works

---

## 💬 AI Chat Testing

### Opening Chat
- [ ] Click "Start Talking" from navigation
- [ ] Click FAB (floating button) bottom-right
- [ ] Chat interface opens in overlay

### Chat Functionality
- [ ] Welcome message appears
- [ ] Type message and press Enter to send
- [ ] AI responds within 1-2 seconds
- [ ] Typing indicator shows while AI is "thinking"
- [ ] Messages display correctly (user on right, AI on left)
- [ ] Timestamps show on messages
- [ ] Can minimize chat (becomes floating button)
- [ ] Can restore from minimized state
- [ ] Can close chat with X button

### AI Intelligence
- [ ] Test anxiety keywords: "I feel anxious" → empathetic response
- [ ] Test sadness: "I'm feeling sad" → supportive response
- [ ] Test stress: "I'm overwhelmed" → understanding response
- [ ] Test relationships: "My relationship is struggling" → relevant response
- [ ] Test work: "Work is stressful" → work-specific response
- [ ] Test loneliness: "I feel lonely" → comforting response
- [ ] Generic message → appropriate default response

### Upgrade Options
- [ ] "Voice" button visible in chat
- [ ] "Video" button visible in chat
- [ ] Clicking Voice switches to voice call
- [ ] Clicking Video switches to video call

---

## 📞 Voice Call Testing

### Starting Call
- [ ] From chat upgrade button
- [ ] From Connect page
- [ ] From FAB quick menu

### Call Interface
- [ ] Shows "Connecting..." status
- [ ] Transitions to "Connected" after 2 seconds
- [ ] Call duration timer starts
- [ ] Listener avatar displays
- [ ] Green "connected" indicator shows

### Controls
- [ ] Mute button toggles (icon changes)
- [ ] Speaker button works
- [ ] Volume slider adjusts
- [ ] Video upgrade button appears
- [ ] End call button closes interface
- [ ] Call duration updates every second

---

## 🎥 Video Call Testing

### Starting Call
- [ ] From voice call upgrade
- [ ] From Connect page
- [ ] From FAB quick menu

### Call Interface
- [ ] Full-screen overlay appears
- [ ] "Connecting..." shows initially
- [ ] Transitions to "Live" status
- [ ] Duration timer works
- [ ] Listener video area displays
- [ ] Your video (PiP) shows in corner

### Controls
- [ ] Mute button works
- [ ] Video on/off toggles camera
- [ ] Full-screen button works
- [ ] Settings button appears
- [ ] End call button closes
- [ ] Screen share button shows (desktop)
- [ ] More options button appears

---

## 📝 Mood Journal Testing

### Creating Entries
- [ ] Click "New Entry" button
- [ ] Dialog opens
- [ ] Select mood (5 options)
- [ ] Mood selection highlights
- [ ] Enter title (required)
- [ ] Enter content (required)
- [ ] Click "Save Entry" → toast notification
- [ ] Entry appears in list
- [ ] Entry persists after page refresh

### Reading Entries
- [ ] Entries display in reverse chronological order
- [ ] Mood badge shows with emoji
- [ ] Date displays correctly
- [ ] Title and content readable
- [ ] Can scroll through long content

### Editing Entries
- [ ] Click Edit icon on entry
- [ ] Dialog opens with existing data
- [ ] Change mood, title, or content
- [ ] Click "Update Entry" → toast notification
- [ ] Changes appear in list
- [ ] Changes persist after refresh

### Deleting Entries
- [ ] Click Delete icon
- [ ] Confirmation dialog appears
- [ ] Click Cancel → nothing happens
- [ ] Click Delete → entry removed
- [ ] Toast notification shows
- [ ] Entry gone after refresh

### Search & Filter
- [ ] Search by title works
- [ ] Search by content works
- [ ] Filter by mood works
- [ ] Filter "All Moods" shows everything
- [ ] Combined search + filter works
- [ ] "No entries" message when no results

### Import/Export
- [ ] Export button downloads JSON file
- [ ] File contains all entries
- [ ] Import button opens file picker
- [ ] Import valid JSON → success toast
- [ ] Imported entries appear in list
- [ ] Import invalid file → error toast

---

## 📊 Mood Tracker Testing

### Logging Mood
- [ ] Today's date is correct
- [ ] Can select mood (1-5 scale)
- [ ] Mood button highlights when selected
- [ ] Click mood → toast notification
- [ ] Update existing mood → toast says "updated"
- [ ] Mood persists after refresh

### Statistics Cards
- [ ] Average Mood calculates correctly
- [ ] Most Common mood shows
- [ ] Total Logs counts entries
- [ ] Current Streak counts consecutive days
- [ ] All stats update when new mood logged

### Charts Tab
- [ ] "Last 7 Days" tab works
  - [ ] Line chart displays
  - [ ] Shows last 7 days of data
  - [ ] Hover shows mood tooltip
  - [ ] Missing days show as 0

- [ ] "Last 30 Days" tab works
  - [ ] Bar chart displays
  - [ ] Shows 30 days of data
  - [ ] Bars colored correctly

- [ ] "Distribution" tab works
  - [ ] Pie chart shows mood breakdown
  - [ ] Percentages calculate correctly
  - [ ] Mood breakdown list shows
  - [ ] Empty state shows if no data

### Import/Export
- [ ] Export downloads JSON
- [ ] Import loads previous data
- [ ] Data merges correctly
- [ ] Toast notifications work

---

## 🌬️ Resources Page Testing

### Breathing Exercise
- [ ] Tab navigation works
- [ ] Circle animation appears
- [ ] Click "Start Exercise" begins
- [ ] Phase changes: Inhale → Hold → Exhale
- [ ] Progress bar updates
- [ ] Instructions change per phase
- [ ] Circle color changes per phase
- [ ] Click "Stop" ends exercise
- [ ] Can restart after stopping

### Crisis Resources
- [ ] All hotline numbers visible
- [ ] Country badges display
- [ ] Warning message shows
- [ ] Cards formatted correctly
- [ ] Links (if any) work

### Self-Care Activities
- [ ] All 6 activities show
- [ ] Icons/emojis display
- [ ] Descriptions readable
- [ ] Cards hover effect works

### Articles
- [ ] All articles display
- [ ] Grid layout works
- [ ] "Read More" buttons appear
- [ ] Hover effects work

---

## 🌐 Navigation Testing

### Desktop Navigation
- [ ] Logo clickable → goes to home
- [ ] All nav items visible
- [ ] Current page highlighted
- [ ] Dark mode toggle works
- [ ] "Start Talking" button works
- [ ] Navigation sticky on scroll

### Mobile Navigation
- [ ] Hamburger menu appears
- [ ] Menu opens on click
- [ ] All pages listed
- [ ] Dark mode toggle in menu
- [ ] "Start Talking" in menu
- [ ] Menu closes after navigation
- [ ] Logo visible and clickable

### Page Navigation
- [ ] Home page loads
- [ ] About page loads
- [ ] Features page loads
- [ ] Journal page loads
- [ ] Tracker page loads
- [ ] Resources page loads
- [ ] Community page loads
- [ ] Connect page loads
- [ ] Contact page loads

---

## 📱 Connect Page Testing

### Quick Start Cards
- [ ] AI Listener card works
- [ ] Voice Call card works
- [ ] Video Call card works
- [ ] Clicking cards opens interfaces

### Human Listeners
- [ ] 4 listeners display
- [ ] Availability badges show
- [ ] Ratings display
- [ ] Session counts show
- [ ] Languages show
- [ ] Chat button works (if available)
- [ ] Call button works (if available)
- [ ] Disabled if unavailable

### Safety Section
- [ ] Guidelines display
- [ ] Crisis resources show
- [ ] Information clear and readable

---

## 📧 Contact Page Testing

### Early Access Form
- [ ] Form displays correctly
- [ ] Name input works
- [ ] Email input works
- [ ] Submit → toast notification
- [ ] Form clears after submit

### Listener Application
- [ ] All form fields work
- [ ] Name required
- [ ] Email required
- [ ] Motivation required
- [ ] Experience optional
- [ ] Submit → toast notification
- [ ] Form clears after submit

### Contact Form
- [ ] Name, email, subject required
- [ ] Message required
- [ ] Submit → toast notification
- [ ] Form clears after submit

### Contact Info Cards
- [ ] Email card shows
- [ ] Community card shows
- [ ] Response time card shows

---

## 🎨 UI/UX Testing

### Dark Mode
- [ ] Toggle switches to dark theme
- [ ] All text readable in dark
- [ ] Cards have dark backgrounds
- [ ] Gradients work in dark mode
- [ ] Charts readable in dark
- [ ] Icons visible in dark
- [ ] Preference persists on refresh

### Responsive Design
- [ ] Mobile (375px): all features work
- [ ] Tablet (768px): layout adjusts
- [ ] Desktop (1920px): looks good
- [ ] Navigation adapts per screen size
- [ ] Cards stack/grid appropriately
- [ ] Text sizes readable on all screens

### Animations
- [ ] Page transitions smooth
- [ ] Fade-in animations work
- [ ] Hover effects on buttons
- [ ] Modal open/close animations
- [ ] Chart animations
- [ ] Breathing exercise animations
- [ ] FAB expand/collapse

### Toast Notifications
- [ ] Success toasts (green)
- [ ] Error toasts (red)
- [ ] Info toasts (blue)
- [ ] Toasts auto-dismiss
- [ ] Position correct (top-right)
- [ ] Readable text

---

## 💾 Data Persistence Testing

### localStorage
- [ ] Journal entries save
- [ ] Mood tracker data saves
- [ ] Welcome modal shows once
- [ ] Data survives page refresh
- [ ] Data survives browser close/reopen
- [ ] Multiple entries don't duplicate

### Export/Import
- [ ] Export creates valid JSON
- [ ] Import reads exported file
- [ ] Import merges with existing data
- [ ] No data loss on import

---

## 🚀 Quick Access FAB Testing

- [ ] FAB appears on all pages except Connect
- [ ] FAB doesn't show when chat/call active
- [ ] Click FAB → menu expands
- [ ] AI Chat option works
- [ ] Voice Call option works
- [ ] Video Call option works
- [ ] Close button (X) collapses menu
- [ ] FAB positioned correctly (bottom-right)
- [ ] FAB doesn't block content

---

## 🎯 Welcome Modal Testing

### First Visit
- [ ] Modal shows on first visit
- [ ] 5 steps display correctly
- [ ] Icons show for each step
- [ ] Descriptions readable
- [ ] Progress dots work
- [ ] "Next" advances step
- [ ] "Back" goes to previous step
- [ ] "Get Started" closes modal
- [ ] "Skip Tutorial" available on step 1

### Return Visit
- [ ] Modal doesn't show again
- [ ] localStorage prevents re-show
- [ ] Can clear localStorage to test again

---

## 🔍 Error Handling

### Edge Cases
- [ ] Empty journal search → shows message
- [ ] No journal entries → shows empty state
- [ ] No mood data → charts show empty state
- [ ] Invalid import file → error toast
- [ ] Missing required fields → validation works
- [ ] Network offline → features still work (offline-first)

### Browser Console
- [ ] No JavaScript errors
- [ ] No React warnings
- [ ] No 404 errors
- [ ] localStorage writes successfully

---

## ✅ Final Checks

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Animations smooth (60fps)
- [ ] No lag when typing
- [ ] Charts render quickly
- [ ] Images load properly

### Accessibility
- [ ] Keyboard navigation works
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Color contrast sufficient

### Cross-Browser
- [ ] Chrome works
- [ ] Firefox works
- [ ] Safari works
- [ ] Edge works
- [ ] Mobile Safari works
- [ ] Mobile Chrome works

---

## 🎉 Launch Ready Criteria

All items above must be checked before launch:

- ✅ All pages load without errors
- ✅ All features functional
- ✅ Data persists correctly
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Dark mode works
- ✅ Toast notifications working
- ✅ Import/export functional
- ✅ AI chat responds intelligently
- ✅ Calls simulate properly
- ✅ Charts display data
- ✅ Forms submit successfully

---

## 📝 Testing Notes

**Tester Name:** _______________  
**Date:** _______________  
**Browser:** _______________  
**Device:** _______________

**Issues Found:**
1. 
2. 
3. 

**Additional Comments:**


---

**When all boxes are checked, you're ready to launch! 🚀**
