# Videochat

---

## Description

---

A Group video calling application using the Agora Web SDK with a Django backend.

## Installation

1. #### Clone the repository:

    ```bash
    git clone https://github.com/aminramezanni/django-videochat.git
    ```

2. #### Navigate to the project directory:

    ```bash
    cd django-videochat
    ```

3. #### Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```
   
4. #### Create Agora account

In order to use this project you will need to replace the agora credentials in `views.py` and `streams.js`.

Create an account at [Agora](www.agora.io) and create an `app`. Once you create your app, you will want to copy the appid & `appCertificate` to update `views.py` and `streams.js`

5. #### Apply database migrations:

    ```bash
    python manage.py migrate
    ```

6. #### Run the development server:

    ```bash
    python manage.py runserver
    ```

7. #### Open your browser and go to [http://localhost:8000/](http://localhost:8000/) to view the application.


## Contanct

 ---

- For any inquiries, please contact at [Amin Ramezani](aminramezanni@gmail.com).

---

- Special thanks to [Dennis Ivy](https://github.com/divanov11).