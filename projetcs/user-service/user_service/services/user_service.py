users = {}


async def save(provider: str, username: str):
    key = f'{provider}|{username}'
    user = users.get(key)

    if not user:
        print(f'User saved. Provider: {provider} Username: {username}')
        user = {'username': username, 'provider': provider}
        users[f'{provider}|{username}'] = user

    return user


async def get(provider: str, username: str):
    return users.get(f'{provider}|{username}')
