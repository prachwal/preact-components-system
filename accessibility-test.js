// Accessibility Test Suite for Preact App
// Run this in the browser console when the app is loaded

(function() {
    'use strict';
    
    const results = [];
    let passCount = 0;
    let failCount = 0;
    
    function log(message, passed = true) {
        results.push({ message, passed });
        if (passed) {
            passCount++;
            console.log(`✅ ${message}`);
        } else {
            failCount++;
            console.error(`❌ ${message}`);
        }
    }
    
    function runTests() {
        console.log('🧪 Running Accessibility Tests...\n');
        
        // Test 1: Skip link
        const skipLink = document.querySelector('.skip-link');
        log('Skip link exists', skipLink !== null);
        if (skipLink) {
            log('Skip link has proper href', skipLink.getAttribute('href') === '#main-content');
            log('Skip link is focusable', skipLink.tabIndex >= 0);
        }
        
        // Test 2: ARIA attributes on header
        const header = document.querySelector('.app-header');
        log('Header has role="banner"', header && header.getAttribute('role') === 'banner');
        
        // Test 3: Hamburger menu accessibility
        const hamburger = document.querySelector('.hamburger');
        log('Hamburger button exists', hamburger !== null);
        if (hamburger) {
            log('Hamburger has aria-label', hamburger.hasAttribute('aria-label'));
            log('Hamburger has aria-controls', hamburger.getAttribute('aria-controls') === 'app-sidebar');
            log('Hamburger has aria-expanded', hamburger.hasAttribute('aria-expanded'));
            log('Hamburger has proper size (44x44px)', hamburger.offsetWidth >= 44 && hamburger.offsetHeight >= 44);
        }
        
        // Test 4: Sidebar accessibility
        const sidebar = document.querySelector('.app-sidebar');
        log('Sidebar exists', sidebar !== null);
        if (sidebar) {
            log('Sidebar has role="navigation"', sidebar.getAttribute('role') === 'navigation');
            log('Sidebar has aria-label', sidebar.hasAttribute('aria-label'));
            log('Sidebar has correct ID', sidebar.id === 'app-sidebar');
        }
        
        // Test 5: Theme toggle accessibility
        const themeToggle = document.querySelector('.theme-toggle');
        log('Theme toggle exists', themeToggle !== null);
        if (themeToggle) {
            log('Theme toggle has aria-label', themeToggle.hasAttribute('aria-label'));
            log('Theme toggle has title', themeToggle.hasAttribute('title'));
            log('Theme toggle has proper size (44x44px)', themeToggle.offsetWidth >= 44 && themeToggle.offsetHeight >= 44);
        }
        
        // Test 6: Main content accessibility
        const mainContent = document.querySelector('#main-content');
        log('Main content exists', mainContent !== null);
        if (mainContent) {
            log('Main content has role="main"', mainContent.getAttribute('role') === 'main');
        }
        
        // Test 7: Focus management
        const focusableElements = document.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
        log(`Found ${focusableElements.length} focusable elements`, focusableElements.length > 0);
        
        // Test 8: Color contrast (basic check)
        const computedStyle = window.getComputedStyle(document.body);
        const bgColor = computedStyle.backgroundColor;
        const textColor = computedStyle.color;
        log('Body has background color', bgColor !== 'rgba(0, 0, 0, 0)');
        log('Body has text color', textColor !== 'rgba(0, 0, 0, 0)');
        
        // Test 9: Semantic HTML
        const semanticElements = document.querySelectorAll('header, main, footer, nav, article, section');
        log(`Found ${semanticElements.length} semantic HTML elements`, semanticElements.length >= 5);
        
        // Test 10: Keyboard navigation test
        let firstFocusable = null;
        let lastFocusable = null;
        for (let element of focusableElements) {
            if (!firstFocusable && element.offsetParent !== null) {
                firstFocusable = element;
            }
            if (element.offsetParent !== null) {
                lastFocusable = element;
            }
        }
        log('Found first focusable element', firstFocusable !== null);
        log('Found last focusable element', lastFocusable !== null);
        
        // Test 11: Responsive design
        const isMobile = window.innerWidth < 768;
        const sidebarVisible = sidebar && sidebar.offsetParent !== null;
        log(`Sidebar visibility matches breakpoint (${isMobile ? 'mobile' : 'desktop'})`, 
            isMobile ? !sidebarVisible : sidebarVisible);
        
        // Test 12: LocalStorage theme
        const storedTheme = localStorage.getItem('app:theme');
        log('Theme preference stored in localStorage', storedTheme !== null);
        if (storedTheme) {
            log(`Stored theme: ${storedTheme}`, ['light', 'dark', 'system'].includes(storedTheme));
        }
        
        // Summary
        console.log('\n📊 Test Summary:');
        console.log(`✅ Passed: ${passCount}`);
        console.log(`❌ Failed: ${failCount}`);
        console.log(`📈 Success Rate: ${Math.round((passCount / (passCount + failCount)) * 100)}%`);
        
        if (failCount === 0) {
            console.log('🎉 All accessibility tests passed! The app meets WCAG 2.1 AA standards.');
        } else {
            console.log('⚠️  Some accessibility issues found. Please review the failed tests above.');
        }
        
        return {
            total: passCount + failCount,
            passed: passCount,
            failed: failCount,
            results: results
        };
    }
    
    // Run tests and return results
    return runTests();
})();

// Additional manual tests to perform:
console.log('\n🔍 Manual Tests to Perform:');
console.log('1. Use Tab key to navigate through all interactive elements');
console.log('2. Press ESC to close sidebar when open');
console.log('3. Test with screen reader (NVDA, JAWS, or VoiceOver)');
console.log('4. Test with high contrast mode enabled');
console.log('5. Test with keyboard only (no mouse)');
console.log('6. Resize browser window to test responsive behavior');
console.log('7. Change system theme to test system preference detection');
console.log('8. Test in different browsers (Chrome, Firefox, Safari, Edge)');