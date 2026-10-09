Feature: ECommerce Validations
    
    @Salesforce
    Scenario Outline: Validate the product search functionality
        Given I am on the eCommerce homepage
        When I search for "<product>"
        Then I should see a list of products related to "<product>"

        Examples:
            | product  |
            | laptop   |
            | smartphone |
            | headphones |