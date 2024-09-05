from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.adcreative import AdCreative
from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.ad import Ad
from facebook_business.adobjects.adimage import AdImage
from facebook_business.adobjects.page import Page
from facebook_business.adobjects.campaign import Campaign

import requests

class FacebookBot:
    def __init__(self, access_token, app_id, app_secret, ad_account_id, page_id):
        FacebookAdsApi.init(app_id, app_secret, access_token)
        self.ad_account_id  = ad_account_id
        self.page_id        = page_id
        self.access_token   = access_token

    def create_campaign(self, campaign_name, objective, special_ad_category, status='PAUSED'):
        """
        Creates a new Facebook Ad Campaign.

        Args:
            campaign_name (str): The name of the campaign.
            objective (str): The objective of the campaign (e.g., 'LINK_CLICKS').
            special_ad_category (str): Special ad category (e.g., 'NONE').
            status (str): The status of the campaign (default is 'PAUSED').

        Returns:
            str: The ID of the created campaign if successful, otherwise None.
        """
        
        try:
            campaign = Campaign(parent_id=self.ad_account_id)
            campaign.update({
                Campaign.Field.name: campaign_name,
                Campaign.Field.objective: objective,
                Campaign.Field.special_ad_categories: special_ad_category,
                Campaign.Field.status: status
            })
            campaign_response = campaign.remote_create()
            campaign_id = campaign[Campaign.Field.id]
            print("Campaign created. ID:", campaign_id)
            return campaign_id
        except Exception as e:
            print(f"Failed to create campaign. Error: {e}")
            return None

    def upload_image(self, image_path):
        """
        Uploads an image to Facebook Ad Account.

        Args:
            image_path (str): The path to the image file to upload.

        Returns:
            str: The hash of the uploaded image if successful, otherwise None.
        """
        
        try:
            image = AdImage(parent_id=self.ad_account_id)
            image[AdImage.Field.filename] = image_path
            image_response = image.remote_create()
            image_hash = image[AdImage.Field.hash]
            print("Image uploaded. Hash:", image_hash)
            return image_hash
        except Exception as e:
            print(f"Failed to upload image. Error: {e}")
            return None

    def create_ad_creative(self, ad_name, ad_text, image_hash):
        """
        Creates an ad creative for the Facebook Ad.

        Args:
            ad_name (str): The name of the ad creative.
            ad_text (str): The text for the ad creative.
            image_hash (str): The hash of the image to use in the ad.

        Returns:
            str: The ID of the created ad creative if successful, otherwise None.
        """
        
        try:
            creative = AdCreative(parent_id=self.ad_account_id)
            creative[AdCreative.Field.name] = ad_name
            creative[AdCreative.Field.object_story_spec] = {
                'page_id': self.page_id,
                'link_data': {
                    'message': ad_text,
                    'image_hash': image_hash
                }
            }
            creative_response = creative.remote_create()
            creative_id = creative[AdCreative.Field.id]
            print("Ad Creative created. ID:", creative_id)
            return creative_id
        except Exception as e:
            print(f"Failed to create ad creative. Error: {e}")
            return None

    def create_ad_set(self, campaign_id, ad_set_name):
        """
        Creates a new Ad Set under the specified campaign.

        Args:
            campaign_id (str): The ID of the campaign to which the ad set belongs.
            ad_set_name (str): The name of the ad set.

        Returns:
            str: The ID of the created ad set if successful, otherwise None.
        """
        
        try:
            ad_set = AdSet(parent_id=self.ad_account_id)
            ad_set.update({
                AdSet.Field.name: ad_set_name,
                AdSet.Field.optimization_goal: AdSet.OptimizationGoal.link_clicks,
                AdSet.Field.billing_event: AdSet.BillingEvent.link_clicks,
                AdSet.Field.bid_amount: 10,     # TODO
                AdSet.Field.daily_budget: 452,  # TODO
                AdSet.Field.campaign_id: campaign_id,
                AdSet.Field.targeting: {
                    'geo_locations': {
                        'countries': ['SK', 'CZ']
                    }
                },
                AdSet.Field.status: AdSet.Status.paused,  # Paused
            })
            ad_set_response = ad_set.remote_create()
            ad_set_id = ad_set[AdSet.Field.id]
            print("Ad Set created. ID:", ad_set_id)
            return ad_set_id
        except Exception as e:
            print("fFailed to create ad set. Error: {e}")
            return None

    def create_ad(self, ad_name, ad_text, image_path, campaign_id):
        """
        Creates and publishes a new ad in a specified campaign.

        Args:
            ad_name (str): The name of the ad.
            ad_text (str): The text for the ad.
            image_path (str): The path to the image file to use in the ad.
            campaign_id (str): The ID of the campaign to which the ad belongs.

        Returns:
            str: The ID of the created ad if successful, otherwise None.
        """

        try:
            image_hash = self.upload_image(image_path)
            if not image_hash:
                return None

            creative_id = self.create_ad_creative(ad_name, ad_text, image_hash)
            if not creative_id:
                return None

            ad_set_id = self.create_ad_set(campaign_id)
            if not ad_set_id:
                return None

            ad = Ad(parent_id=self.ad_account_id)
            ad.update({
                Ad.Field.name: ad_name,
                Ad.Field.adset_id: ad_set_id,
                Ad.Field.creative: {'creative_id': creative_id},
                Ad.Field.status: Ad.Status.paused  # Paused
            })
            ad_response = ad.remote_create()
            ad_id = ad[Ad.Field.id]
            print("Ad created. ID:", ad_id)
            return ad_id
        except Exception as e:
            print(f"Failed to create ad. Error: {e}")
            return None

    def get_pages(self):
        """
        Retrieves the list of Facebook Pages managed by the user.

        Returns:
            dict: The list of pages managed by the user, or None if failed.
        """
        
        pages = None
        try:
            user = Page(fbid='me')
            pages = user.api_get(fields=['accounts'])
            print("Pages you manage:")
            for page in pages['accounts']['data']:
                print(f"Page Name: {page['name']}, Page ID: {page['id']}")
        except Exception as e:
            print(f"Failed to retrieve pages. Error: {e}")
        
        return pages

    def get_ad_account(self):
        """
        Retrieves information about the Facebook Ad Account.

        Returns:
            dict: The information of the ad account, or None if failed.
        """
        
        account_info = None
        try:
            ad_account = AdAccount(self.ad_account_id)
            account_info = ad_account.api_get()
            print("API Initialized Successfully. Account Info:")
            print(account_info)
        except Exception as e:
            print(f"Failed to initialize API. Error: {e}")
        
        return account_info

    def get_permissions(self):
        """
        Retrieves permissions associated with the access token.

        Returns:
            dict: The permissions associated with the access token, or None if failed.
        """
        
        permissions = None
        try:
            url = f"https://graph.facebook.com/v20.0/me/permissions"
            params = {
                'access_token': self.access_token
            }
            response = requests.get(url, params=params)
            data = response.json()
            
            if 'data' in data:
                print("Permissions associated with the access token:")
                for permission in data['data']:
                    print(f"Permission: {permission['permission']}, Status: {permission['status']}")
            else:
                print("Failed to retrieve permissions. Response:", data)
        except Exception as e:
            print("Failed to retrieve permissions. Error:", str(e))
        
        return permissions