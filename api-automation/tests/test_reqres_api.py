from utils.api_client import ApiClient


BASE_URL = "https://reqres.in/api"


def test_get_single_user_returns_200():
    client = ApiClient(BASE_URL)
    response = client.get("/users/2")

    assert response.status_code == 200
    assert response.json()["data"]["id"] == 2


def test_login_unsuccessful_without_password_returns_400():
    client = ApiClient(BASE_URL)
    payload = {"email": "peter@klaven"}
    response = client.post("/login", json=payload)

    assert response.status_code == 400
    assert response.json()["error"] == "Missing password"
