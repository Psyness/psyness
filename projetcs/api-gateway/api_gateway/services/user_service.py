from clients import user_client

async def save_or_get(provider, token):
    oauth_user_info = token['userinfo']
    user = await user_client.save_or_get(provider, oauth_user_info.get('email'))
    return dict({
        'username': user['username'],
        'provider': provider
    })
