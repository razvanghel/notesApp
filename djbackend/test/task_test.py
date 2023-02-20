import unittest
from common import *

def addTask(driver, title, description):
    log("Creating new task...")
    editTask(driver, title, description)
    pressButton(driver, 'done-btn')

def editTask(driver, title, description):
    placeInput(driver, 'textarea[class="textarea title"]', title, by=By.CSS_SELECTOR)
    placeInput(driver, 'textarea[class="textarea body"]', description, by=By.CSS_SELECTOR)

def taskSetup(driver):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    findElem(driver, 'a[class="floating-button"]', by=By.CSS_SELECTOR).click()

class TaskTest(unittest.TestCase):

    def setUp(self):
        self.driver = setup()

    def testAddTask(self):
        wait(5)
        taskSetup(self.driver)
        wait(2)
        title = randomString()
        description = randomString()
        addTask(self.driver, title, description)
        wait(2)
        findElements(self.driver, 'div[class=list-item]', by=By.CSS_SELECTOR)[-1].click()
        wait(1)
        self.assertEqual(title, findElem(self.driver, 'textarea[class="textarea title"]', by=By.CSS_SELECTOR).text)
        self.assertEqual(description, findElem(self.driver, 'textarea[class="textarea body"]', by=By.CSS_SELECTOR).text)
        log("Task created successfully.")


    def testEditTask(self):
        wait(5)
        taskSetup(self.driver)
        wait(2)
        title = randomString()
        description = randomString()
        addTask(self.driver, title, description)
        wait(2)
        findElements(self.driver, 'div[class=list-item]', by=By.CSS_SELECTOR)[-1].click()
        wait(1)
        self.assertEqual(title, findElem(self.driver, 'textarea[class="textarea title"]', by=By.CSS_SELECTOR).text)
        self.assertEqual(description, findElem(self.driver, 'textarea[class="textarea body"]', by=By.CSS_SELECTOR).text)
        exp_title = randomString()
        exp_desc = randomString()
        editTask(self.driver, exp_title, exp_desc)
        findElem(self.driver, 'h3[id=arrow-left]', by=By.CSS_SELECTOR).click()
        wait(1)
        findElements(self.driver, 'div[class=list-item]', by=By.CSS_SELECTOR)[0].click()
        self.assertEqual(exp_title, findElem(self.driver, 'textarea[class="textarea title"]', by=By.CSS_SELECTOR).text)
        self.assertEqual(exp_desc, findElem(self.driver, 'textarea[class="textarea body"]', by=By.CSS_SELECTOR).text)


    def testDeleteTask(self):

        taskSetup(self.driver)
        wait(2)
        title = randomString()
        description = randomString()
        addTask(self.driver, title, description)
        wait(2)
        before = len(findElements(self.driver, 'div[class=list-item]', by=By.CSS_SELECTOR))
        findElements(self.driver, 'div[class=list-item]', by=By.CSS_SELECTOR)[-1].click()
        wait(1)
        pressButton(self.driver, "delete-btn")
        wait(2)
        self.assertEqual(before-1, len(findElements(self.driver, 'div[class=list-item]', by=By.CSS_SELECTOR)))

    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()