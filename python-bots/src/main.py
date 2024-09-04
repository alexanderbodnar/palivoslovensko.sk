from facebook_bot import FacebookBot

from dotenv import load_dotenv
import os


if __name__ == "__main__":
    
    # Initialize the credentials from the .env for the Facebook account
    load_dotenv()
    
    access_token  = os.getenv("ACCESS_TOKEN")
    app_id        = os.getenv("APP_ID")
    app_secret    = os.getenv("APP_SECRET")
    ad_account_id = os.getenv("AD_ACCOUNT_ID")
    page_id       = os.getenv("PAGE_ID")

    # Initialize the FB bot
    facebok_bot = FacebookBot(access_token=access_token, app_id=app_id, app_secret=app_secret, ad_account_id=ad_account_id, page_id=page_id)
    
    # This campaign is created already, no need to run it one more time
    #facebok_bot.create_campaign(campaign_name="TEST04092024", objective='OUTCOME_TRAFFIC', special_ad_category='NONE') 
    
    #facebok_bot.create_ad_set(campaign_id="120210550183960423", ad_set_name="TEST04092024") # Waiting for several weeks due to policies for new accounts.
    