import requests
import json


class ScrapeDataFromGoogle():
    def __init__(self):
        self.url = "http://www.google.com/search?q=python"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}


    def get_proxies(self):
        with open('./proxies.txt', 'r') as file:
            proxies = [line.strip() for line in file]
        return proxies

    def send_requests(self):
        proxies = self.get_proxies()
        for proxy in proxies:
            try:
                response = requests.get(self.url, headers=self.headers, proxies={"http": proxy, "https": proxy})
                if response.status_code == 200:
                    print(f"Success with proxy: {proxy}")
                else:
                    print(response.status_code)
                    print(f"Failed with proxy: {proxy}")
            except requests.exceptions.RequestException as e:
                print(f"Error with proxy {proxy}: {e}")
                

    def run(self):
        self.send_requests()
        
        
if __name__ == "__main__":
    ScrapeDataFromGoogle().run()