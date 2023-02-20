import random
import string
import time

import numpy as np
from selenium import webdriver
from selenium.common import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from web_helper import *

BURGER = "burger"
def pressBurgerButton(driver):
    pressButton(driver, BURGER)

def addProject(driver, name):
    wait(3)
    log("Creating a new project...")
    placeInput(driver, 'new-project', name)
    pressButton(driver, 'submit-project')
    log("Project created.")

def elementExists(driver, locator, by = By.ID):
    try:
        findElem(driver, locator, by)
    except NoSuchElementException:
        return False
    return True

def randomString():
    length = random.randint(1, 10)
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

def randomInt():
    return random.randint(1, 100)

def randomStringList(length):
    return [randomString() for i in range(length)]

def waitUntilVisible(driver, locator, timeout = 10, by = By.ID):
    wait = WebDriverWait(driver, timeout)
    element = wait.until(ec.visibility_of_element_located((by, locator)))
    return element

def wait(seconds):
    time.sleep(seconds)

def log(message):
    print(message)

def findElements(driver, locator, by = By.ID):
    return driver.find_elements(value = locator, by = by)

def findElem(driver, locator, by = By.ID):
    return driver.find_element(by = by , value = locator)
    
def findByCss(driver, css):
    return driver.find_element(By.CSS_SELECTOR, css)
    
def findById(driver, id):
    return driver.find_element(By.ID, id)

def pressButton(driver, locator, timeout = 10):
    waitUntilVisible(driver, locator, timeout = timeout).click()

def placeInput(driver, locator, value, timeout = 10, by=By.ID):
    element = waitUntilVisible(driver, locator, timeout = timeout, by=by)
    element.clear()
    element.send_keys(value)
    assert element.get_attribute('value') == value

def areEqual(expected, actual, message = None):
    if message == None:
        message = f"{expected} != {actual}"
    if isinstance(expected, (int, np.integer)):
        actual = int(actual)
    else:
        if isinstance(expected, (float, np.integer)):
         actual = float(actual)
    assert expected == actual, message

def setup():
    driver = webdriver.Chrome()
    goTo(driver, "http://localhost:3000")
    return driver