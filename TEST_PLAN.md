# Unmutte - Comprehensive Test Plan

## Test Date: 2025-11-08
## Tester: Senior Product Manager & Developer

---

## 1. NAVIGATION TESTS

### 1.1 Top Navigation Bar
- [ ] Logo click → Returns to Home
- [ ] Home link → Navigates to Home page
- [ ] About link → Navigates to About page  
- [ ] Features link → Navigates to Features page
- [ ] Journal link → Navigates to Journal page
- [ ] Tracker link → Navigates to Tracker page
- [ ] Resources link → Navigates to Resources page
- [ ] Community link → Navigates to Community page
- [ ] Connect link → Navigates to Connect page
- [ ] Contact link → Navigates to Contact page
- [ ] Account icon → Navigates to Account page
- [ ] Theme toggle → Switches between light/dark mode
- [ ] "Start Talking" button → Opens AI Chat interface

### 1.2 Mobile Navigation
- [ ] Menu hamburger → Opens mobile menu
- [ ] All navigation items work in mobile menu
- [ ] Mobile menu closes after navigation
- [ ] "Start Talking" button works in mobile menu
- [ ] Theme toggle works in mobile menu

---

## 2. HOMEPAGE TESTS

### 2.1 Hero Section
- [ ] "Get Started Free" button → Opens AI Chat
- [ ] "Start Journaling" button → Navigates to Journal page

### 2.2 Feature Cards
- [ ] "Get Started" button (AI Support) → Navigates to Connect page
- [ ] "Connect Now" button (Human Listener) → Navigates to Connect page

### 2.3 Interactive Elements
- [ ] All animations load correctly
- [ ] Text is readable in both light/dark modes
- [ ] No visual glitches or overlapping elements

---

## 3. RESOURCES PAGE TESTS

### 3.1 Breathing Exercise
- [ ] "Try Practice" button → Starts breathing exercise
- [ ] Breathing animation works smoothly
- [ ] Timer displays correctly
- [ ] Can pause/stop breathing exercise

### 3.2 Stress Game
- [ ] "Start Smashing Stress" button → Opens game modal
- [ ] Game modal appears with correct z-index (above all content)
- [ ] Modal background darkens the page properly
- [ ] "X" close button → Closes modal
- [ ] "Start Game" button → Begins countdown
- [ ] Countdown (3, 2, 1) displays correctly
- [ ] Game starts after countdown
- [ ] Bubbles spawn from bottom
- [ ] Bubbles float upward smoothly
- [ ] Clicking bubbles → Increments score
- [ ] Timer counts down from 30s
- [ ] Timer doesn't stop when clicking bubbles
- [ ] "Skip" button → Ends game early
- [ ] Results screen shows correct score and misses
- [ ] "Continue" button → Shows reflection screen
- [ ] Mood selection works (5 emoji buttons)
- [ ] Reflection textarea accepts input
- [ ] "Complete" button disabled until mood selected
- [ ] "Complete" button → Closes modal and saves results

### 3.3 Crisis Resources
- [ ] All crisis hotline links are clickable
- [ ] External links open in new tab

---

## 4. CHAT INTERFACE TESTS

### 4.1 AI Chat
- [ ] Opens from "Start Talking" button
- [ ] Opens from Quick Access FAB
- [ ] Message input field works
- [ ] Send button works
- [ ] Messages display correctly
- [ ] "Upgrade to Voice" button → Opens voice interface
- [ ] Close button → Closes chat interface

### 4.2 Voice Call Interface
- [ ] Opens from AI chat upgrade
- [ ] Opens from Quick Access FAB
- [ ] Displays call status (connecting/connected)
- [ ] Timer works
- [ ] End call button works
- [ ] Feedback modal appears after call ends

---

## 5. JOURNAL & TRACKER TESTS

### 5.1 Mood Journal
- [ ] Journal entry form works
- [ ] Can add new entries
- [ ] Entries display correctly
- [ ] Can edit entries
- [ ] Can delete entries

### 5.2 Mood Tracker
- [ ] Mood rating selector works
- [ ] Data saves correctly
- [ ] Charts display properly
- [ ] Date filters work

---

## 6. ACCOUNT PAGE TESTS

### 6.1 Login/Signup
- [ ] Email input validates
- [ ] Google sign-in button (UI only)
- [ ] Login saves to localStorage
- [ ] Logout clears localStorage

### 6.2 Profile Management
- [ ] Can update profile information
- [ ] Data persists correctly

---

## 7. QUICK ACCESS FAB TESTS

- [ ] FAB visible on all pages except Connect
- [ ] Click opens menu
- [ ] "AI Chat" button → Opens chat interface
- [ ] "Voice Call" button → Opens voice interface
- [ ] "Stress Game" button → Opens game (if available)
- [ ] Close button collapses menu

---

## 8. Z-INDEX & LAYER TESTS

- [ ] Game modal appears above all page content
- [ ] Game modal appears above navigation
- [ ] Chat interface appears above page content
- [ ] Voice interface appears above page content
- [ ] Modals block interaction with content beneath
- [ ] No z-index conflicts between modals

---

## 9. DARK/LIGHT MODE TESTS

- [ ] Theme persists on page reload
- [ ] All text readable in both modes
- [ ] All buttons visible in both modes
- [ ] Game modal readable in both modes
- [ ] No contrast issues in either mode

---

## 10. RESPONSIVE DESIGN TESTS

### 10.1 Mobile (< 768px)
- [ ] Navigation collapses to hamburger
- [ ] All buttons remain clickable
- [ ] Game modal fits screen
- [ ] No horizontal scrolling
- [ ] Text remains readable

### 10.2 Tablet (768px - 1024px)
- [ ] Layout adjusts appropriately
- [ ] Game modal sized correctly
- [ ] Touch targets adequate size

### 10.3 Desktop (> 1024px)
- [ ] Full navigation visible
- [ ] Game modal centered
- [ ] Optimal layout spacing

---

## CRITICAL ISSUES TO FIX

### High Priority
1. ❌ Game modal z-index conflicts
2. ❌ Buttons not working (need specific identification)
3. ❌ Navigation state management
4. ❌ Modal visibility issues

### Medium Priority
5. ❌ Form validation
6. ❌ Data persistence
7. ❌ Error handling

### Low Priority
8. ❌ Animation performance
9. ❌ Loading states
10. ❌ Accessibility improvements

---

## NOTES
- Test in Chrome, Firefox, Safari
- Test on actual mobile devices
- Check console for errors
- Validate localStorage data
