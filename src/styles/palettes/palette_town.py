from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import csv
import time

# Initialize the WebDriver with SSL handling
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors')
options.add_argument('--log-level=3')


driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
driver.get('https://pokepalettes.com/#bulbasaur')

# Open CSV file for writing
with open('pokemon_color_palettes.csv', mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    # Write the header row
    writer.writerow(['pokemon', 'color', 'width'])
    
    while True:
        # Get current Pokémon name from the page
        pokemon_name = driver.find_element(By.CSS_SELECTOR, '#input_container input').get_attribute('value').lower()

        # Extract color palette data
        color_graph = driver.find_element(By.ID, 'color_graph')
        color_bars = color_graph.find_elements(By.CSS_SELECTOR, '.bar')
        for bar in color_bars:
            color = bar.text.strip()
            if color:  # Only process non-empty divs
                width = bar.size['width']
                writer.writerow([pokemon_name, color, width])
                print(f'Pokemon: {pokemon_name}, Color: {color}, Width: {width}')
        
        # Break the loop if Genesect is reached
        if pokemon_name == 'genesect':
            break
        
        # Navigate to the next Pokémon
        body = driver.find_element(By.TAG_NAME, 'body')
        body.send_keys(Keys.ARROW_RIGHT)
        
        # Wait for the next page to load
        time.sleep(1)  # Adjust sleep time if necessary

# Quit the WebDriver
driver.quit()