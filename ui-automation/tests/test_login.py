from pages.login_page import LoginPage


def test_successful_login(driver):
    login_page = LoginPage(driver)
    login_page.load()
    login_page.login("standard_user", "secret_sauce")

    assert login_page.get_products_title() == "Products"


def test_unsuccessful_login_with_invalid_credentials(driver):
    login_page = LoginPage(driver)
    login_page.load()
    login_page.login("invalid_user", "wrong_password")

    assert "Username and password do not match" in login_page.get_error_message()
