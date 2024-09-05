from facebook_business.api import FacebookAdsApi

import requests

class InstagramBot:
    def __init__(self, access_token, app_id, app_secret, page_id, instagram_account_id):
        FacebookAdsApi.init(app_id, app_secret, access_token)
        self.access_token         = access_token
        self.page_id              = page_id
        self.instagram_account_id = instagram_account_id
    
    def upload_image_to_container(self, image_url, caption):
        """
        Uploads an image to an Instagram media container.

        Args:
            image_url (str): URL of the image to upload.
            caption (str): Caption for the Instagram post.

        Returns:
            str: The ID of the media container if successful, otherwise None.
        """
        
        try:
            url = f"https://graph.facebook.com/v17.0/{self.instagram_account_id}/media"
            payload = {
                'image_url': image_url,
                'caption': caption,
                'access_token': self.access_token
            }
            response = requests.post(url, data=payload)
            data = response.json()
            if 'id' in data:
                print(f"Image uploaded to container. Container ID: {data['id']}")
                return data['id']
            else:
                print(f"Error in uploading image to container: {data}")
                return None
        except Exception as e:
            print(f"Failed to upload image to container. Error: {e}")
            return None

    def publish_container(self, container_id):
        """
        Publishes a media container as an Instagram post.

        Args:
            container_id (str): The ID of the media container to publish.

        Returns:
            str: The ID of the published post if successful, otherwise None.
        """
        
        try:
            url = f"https://graph.facebook.com/v17.0/{self.instagram_account_id}/media_publish"
            payload = {
                'creation_id': container_id,
                'access_token': self.access_token
            }
            response = requests.post(url, data=payload)
            data = response.json()
            if 'id' in data:
                print(f"Post published. Post ID: {data['id']}")
                return data['id']
            else:
                print(f"Error in publishing post: {data}")
                return None
        except Exception as e:
            print(f"Failed to publish post. Error: {e}")
            return None

    def create_instagram_post(self, image_url, caption):
        """
        Creates and publishes an Instagram post.

        Args:
            image_url (str): URL of the image to upload.
            caption (str): Caption for the Instagram post.

        Returns:
            str: The ID of the published post if successful, otherwise None.
        """
        
        # Upload image to a media container
        container_id = self.upload_image_to_container(image_url, caption)
        if not container_id:
            return None
        
        # Publish the media container as a post
        post_id = self.publish_container(container_id)
        if not post_id:
            return None

        return post_id