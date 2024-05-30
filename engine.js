document.addEventListener("DOMContentLoaded", function() {
  const inputField = document.getElementById('scopeInput');
  const suggestionsDiv = document.getElementById('suggestions');
  const toolsInputField = document.getElementById('toolsInput');
  const toolssuggestionDiv = document.getElementById('toolsSuggestions');
  
  let selectedSuggestions = [];
  let selectedTools = [];

  inputField.addEventListener('input', getSuggestions);
  toolsInputField.addEventListener('input', getToolsSuggestions);

  // Function to update the input field with selected suggestions
  function updateSelectedSuggestions() {
    // Clear the input field's parent element
    inputField.parentElement.querySelectorAll('.suggestion-tag').forEach(tag => tag.remove());
    inputField.value = '';
    selectedSuggestions.forEach(suggestion => {
      const suggestionTag = document.createElement('span');
      suggestionTag.classList.add('suggestion-tag');
      suggestionTag.textContent = suggestion;

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-suggestion');
      removeButton.textContent = 'x';
      removeButton.addEventListener('click', () => {
        selectedSuggestions = selectedSuggestions.filter(item => item !== suggestion);
        updateSelectedSuggestions();
      });

      suggestionTag.appendChild(removeButton);
      inputField.parentElement.insertBefore(suggestionTag, inputField);
    });
  }

  // Function to update the tools input field with selected tools
  function updateSelectedTools() {
    // Clear the tools input field's parent element
    toolsInputField.parentElement.querySelectorAll('.tool-tag').forEach(tag => tag.remove());
    toolsInputField.value = '';
    selectedTools.forEach(tool => {
      const toolTag = document.createElement('span');
      toolTag.classList.add('tool-tag');
      toolTag.textContent = tool;

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-tool');
      removeButton.textContent = 'x';
      removeButton.addEventListener('click', () => {
        selectedTools = selectedTools.filter(item => item !== tool);
        updateSelectedTools();
      });

      toolTag.appendChild(removeButton);
      toolsInputField.parentElement.insertBefore(toolTag, toolsInputField);
    });
  }

  // ***************** Service Scope Suggestions *****************
  function getSuggestions() {
    const input = inputField.value.trim();

    if (input === '') {
      suggestionsDiv.innerHTML = '';
      return;
    }

    // Fetch JSON data from your server or file
    fetch('service_and_parts.json')
      .then(response => response.json())
      .then(data => {
        // Extract 'Name' fields from JSON objects and populate mockData array
        const mockData = data.map(item => item.Name);

        // Filter suggestions based on input
        const filteredSuggestions = mockData.filter(suggestion =>
          suggestion.toLowerCase().includes(input.toLowerCase())
        );

        // Display suggestions
        if (filteredSuggestions.length > 0) {
          suggestionsDiv.innerHTML = '';
          filteredSuggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.classList.add('suggestion');
            suggestionElement.textContent = suggestion;
            suggestionElement.addEventListener('click', () => {
              if (!selectedSuggestions.includes(suggestion)) {
                selectedSuggestions.push(suggestion);
                updateSelectedSuggestions();
              }
              suggestionsDiv.innerHTML = '';
            });

            // Add hover effect
            suggestionElement.addEventListener('mouseenter', () => {
              suggestionElement.classList.add('hovered');
            });

            suggestionElement.addEventListener('mouseleave', () => {
              suggestionElement.classList.remove('hovered');
            });

            suggestionsDiv.appendChild(suggestionElement);
          });
        } else {
          suggestionsDiv.innerHTML = '<div class="no-results">No results found</div>';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // ***************** Special Tools Suggestions *****************
  function getToolsSuggestions() {
    const toolsInput = toolsInputField.value.trim();

    if (toolsInput === '') {
      toolssuggestionDiv.innerHTML = '';
      return;
    }

    const toolsData = [
      'Standard Tool Kit',
      'Ethernet Tester',
      'Laptop w/ Ethernet Port with Firefox Installed',
      'Device w/ HotSpot Functionality',
      'Outlet Tester',
      'Volt-Meter',
      '18v Drill w/ Assorted Cobalt Drill Bit Set',
      'Standard 29pc Drill bit set',
      'Assorted Screwdrivers',
      'Measuring Tape',
      'Magnetic Level',
      'Rubber Mallet',
      'Pry bar / Crowbar',
      'Wire Fishing Tool',
      'Rivet Gun',
      '1/8” and 3/16” rivets',
      'Magnetic Flashlight/ headlamp',
      'Painters Tape',
      'Microfiber Cloth',
      '3/8s ratchet set w/matching socket kit',
      'Precision Screwdriver Set, iFixit or equivalent',
      'Ethernet cable terminals',
      'Ethernet cable terminating tool',
      'Torx T10 Screwdriver 2 inch or longer',
      '“A-Frame” Ladder, 6ft minimum',
      'Precision Screwdriver Set',
      'Ethernet cable terminals',
      'Ethernet cable terminating tool', 
      'Ratchet and 90 degree socket adapter',
      'Include drive sockets: 1/4”, 5/16” deep socket, 3/8” hex bit, 7/16”, 3/4',
      'Needle Nose and diagonal pliers',
      'Nylon Cable/Wire Fisher/Feeder',
      'Pick & Hook set',
      ];

    const filteredToolsSuggestions = toolsData.filter(suggestion =>
      suggestion.toLowerCase().includes(toolsInput.toLowerCase())
    );

    // Display tools suggestions
    if (filteredToolsSuggestions.length > 0) {
      toolssuggestionDiv.innerHTML = '';
      filteredToolsSuggestions.forEach(suggestion => {
        const toolsSuggestionElement = document.createElement('div');
        toolsSuggestionElement.classList.add('suggestion');
        toolsSuggestionElement.textContent = suggestion;
        toolsSuggestionElement.addEventListener('click', () => {
          if (!selectedTools.includes(suggestion)) {
            selectedTools.push(suggestion);
            updateSelectedTools();
          }
          toolssuggestionDiv.innerHTML = '';
        });

        // Add hover effect
        toolsSuggestionElement.addEventListener('mouseenter', () => {
          toolsSuggestionElement.classList.add('hovered');
        });

        toolsSuggestionElement.addEventListener('mouseleave', () => {
          toolsSuggestionElement.classList.remove('hovered');
        });

        toolssuggestionDiv.appendChild(toolsSuggestionElement);
      });
    } else {
      toolssuggestionDiv.innerHTML = '<div class="no-results">No results found</div>';
    }
  }
});
