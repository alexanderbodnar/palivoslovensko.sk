from dotenv import load_dotenv
import os

# Initialize the credentials from the .env for the Facebook & Instagram account
load_dotenv()

CREDENTIALS = {
    "access_token":     os.getenv("ACCESS_TOKEN"),
    "app_id":           os.getenv("APP_ID"),
    "app_secret":       os.getenv("APP_SECRET"),
    "ad_account_id":    os.getenv("AD_ACCOUNT_ID"),
    "page_id":          os.getenv("PAGE_ID"),
    "ig_account_id":    os.getenv("IG_ACCOUNT_ID")
}
