 
        const button = document.getElementById('next');

        // Function to run on every click
        function handleClick(source) {
            console.log(`Button clicked by: ${source}`);
        }

        // Auto-click every 3 seconds
        const autoClickInterval = setInterval(() => {
            button.click(); // triggers the click event
        }, 3000);

        // Actual button click handler
        button.addEventListener('click', function (event) {
            handleClick(event.isTrusted ? "User" : "Auto");
        });

        // Detect user interaction anywhere on screen
        function stopAutoClick(event) {
            if (event.isTrusted) {
                clearInterval(autoClickInterval);
                console.log("User clicked anywhere. Auto-clicking stopped.");
                // Remove this event listener after first real user click
                window.removeEventListener('click', stopAutoClick);
            }
        }

        // Start listening for user click anywhere
        window.addEventListener('click', stopAutoClick);
