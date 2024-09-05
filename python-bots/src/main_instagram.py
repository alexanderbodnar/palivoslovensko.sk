from instagram_bot import InstagramBot
from config import CREDENTIALS

if __name__ == "__main__":

    # Initialiye the Instagram bot
    instagram_bot = InstagramBot(
        access_token=CREDENTIALS['access_token'],
        app_id=CREDENTIALS['app_id'],
        app_secret=CREDENTIALS['app_secret'],
        page_id=CREDENTIALS['page_id'],
        instagram_account_id=CREDENTIALS['ig_account_id']
    )

    """
    image_url = "HTTPS LINK WITH .JPG,.PNG,.JPEG"
    caption = 'CAPTION TO USE'

    post_id = instagram_bot.create_instagram_post(image_url, caption)
    if post_id:
        print(f"Instagram post published successfully with ID: {post_id}")
    else:
        print("Failed to publish Instagram post.")
    """