from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class LoginPage(BasePage):
    URL = "https://www.saucedemo.com/"

    USERNAME_INPUT = (By.ID, "user-name")
    PASSWORD_INPUT = (By.ID, "password")
    LOGIN_BUTTON = (By.ID, "login-button")
    PRODUCTS_TITLE = (By.CSS_SELECTOR, ".title")
    ERROR_MESSAGE = (By.CSS_SELECTOR, "[data-test='error']")

    def load(self) -> None:
        self.open(self.URL)

    def login(self, username: str, password: str) -> None:
        self.type_text(self.USERNAME_INPUT, username)
        self.type_text(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)

    def get_products_title(self) -> str:
        return self.get_text(self.PRODUCTS_TITLE)

    def get_error_message(self) -> str:
        return self.get_text(self.ERROR_MESSAGE)
