import os
import openai

class Agent:
    def __init__(self, name, instructions, api_key=None):
        self.name = name
        self.instructions = instructions
        
        # Use the provided API key or fall back to environment variable
        if api_key:
            self.api_key = api_key
        else:
            self.api_key = os.getenv("OPENAI_API_KEY")
            
        if not self.api_key:
            raise ValueError("API key is required. Provide it directly or set OPENAI_API_KEY environment variable.")

class Runner:
    @staticmethod
    def run_sync(agent, prompt):
        # Configure the OpenAI client with the API key
        client = openai.OpenAI(api_key=agent.api_key)
        
        # Make a request to the OpenAI API
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": agent.instructions},
                {"role": "user", "content": prompt}
            ]
        )
        
        # Return a simple result object with the response
        return RunResult(response.choices[0].message.content)

class RunResult:
    def __init__(self, final_output):
        self.final_output = final_output
