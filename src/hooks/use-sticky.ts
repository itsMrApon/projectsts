'use client'
import { useEffect, useRef, useState } from "react";
import $ from "jquery";


const useSticky = () => {
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const stickyHeader = (): void => {
    if (window.scrollY > 200) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };


  useEffect(() => {
    const setHeaderHeight = headerRef.current?.offsetHeight;

    if (setHeaderHeight) {
      const headerElements = document.querySelectorAll<HTMLDivElement>('.tp-header-height');
      headerElements.forEach(element => {
        console.log('setHeaderHeight', setHeaderHeight,element);
        element.style.height = `${setHeaderHeight}px`;
      });
    }
  }, []);

  function headerFullWidth () {
    const menuElements = document.querySelectorAll(".tp-menu-fullwidth");
    menuElements.forEach((element: Element) => {
      const previousDiv = element.parentElement?.parentElement;
      if (previousDiv) {
        previousDiv.classList.add("has-homemenu");
      }
    });
  };

  function adjustMenuBackground() {
    if ($('.tp-header-3-area').length > 0) {
      const menuBox = $('.tp-header-3-menu-box');
      const menuBg = $('.menu-bg');
      
      // Check if menu box is visible (not hidden by responsive classes)
      if (menuBox.is(':visible') && menuBox.width()! > 0) {
        const menuBoxWidth = menuBox.width()!;
        const menuBoxHeight = menuBox.height()!;
        const menuBoxOffset = menuBox.offset()!;
        
        // Center the background by adjusting the left position
        const leftPosition = menuBoxOffset.left - 23; // Half of the extra width (46/2)
        
        menuBg.css({
          'width': menuBoxWidth + 46,
          'height': menuBoxHeight,
          'left': leftPosition,
          'display': 'inline-block'
        });
      } else {
        // Hide menu-bg when menu box is not visible
        menuBg.css({
          'display': 'none'
        });
      }
    }
  }
  


  useEffect(() => {
    window.addEventListener("scroll", stickyHeader);
    
    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        adjustMenuBackground();
      }, 100);
    };
    
    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("scroll", stickyHeader);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return {
    sticky,
    headerRef,
    headerFullWidth,
    adjustMenuBackground,
  };
};

export default useSticky;
