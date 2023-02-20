import unittest
from common import *

class ProjectTest(unittest.TestCase):

    def setUp(self):
        self.driver = setup()

    def testAddProject(self):
        wait(5)
        pressBurgerButton(self.driver)
        expected = randomString()
        addProject(self.driver, expected)
        wait(3)
        pressBurgerButton(self.driver)
        wait(2)
        self.assertTrue(elementExists(self.driver, f"project-{expected}"))
        log("Project exists.")

    def testEditProject(self):
        wait(5)
        pressBurgerButton(self.driver)
        old = randomString()
        wait(2)
        addProject(self.driver, old)
        wait(2)
        pressBurgerButton(self.driver)
        wait(3)
        pressButton(self.driver, f"edit-{old}")
        expected = randomString()
        wait(2)
        log("Editing project...")
        findElem(self.driver, f"input-project-{old}").clear()
        placeInput(self.driver, f"input-project-{old}", expected)
        pressButton(self.driver, f"confirm-{old}")
        wait(1)
        self.assertTrue(elementExists(self.driver, f"project-{expected}"))
        self.assertFalse(elementExists(self.driver, f"project-{old}"))

    def testDeleteProject(self):
        wait(4)
        pressBurgerButton(self.driver)
        expected = randomString()
        wait(2)
        addProject(self.driver, expected)
        wait(2)
        pressBurgerButton(self.driver)
        wait(3)
        log("Deleting project...")
        self.assertTrue(elementExists(self.driver, f"project-{expected}"))
        pressButton(self.driver, f"delete-{expected}")
        wait(2)
        pressBurgerButton(self.driver)
        wait(3)
        self.assertFalse(elementExists(self.driver, f"project-{expected}"))
        log("Project was deleted successfully.")

    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()