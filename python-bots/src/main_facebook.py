from facebook_bot import FacebookBot
from config import CREDENTIALS

if __name__ == "__main__":
    
    # Initialize the Facebook bot
    facebok_bot = FacebookBot(
        access_token=CREDENTIALS['access_token'],
        app_id=CREDENTIALS['app_id'],
        app_secret=CREDENTIALS['app_secret'],
        ad_account_id=CREDENTIALS['ad_account_id'],
        page_id=CREDENTIALS['page_id']
    )
    
    # This campaign is created already, no need to run it one more time
    #facebok_bot.create_campaign(campaign_name="TEST04092024", objective='OUTCOME_TRAFFIC', special_ad_category='NONE') 
    
    # Waiting for several weeks due to policies for new accounts.
    #facebok_bot.create_ad_set(campaign_id="120210550183960423", ad_set_name="TEST04092024")