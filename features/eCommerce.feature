Feature: ECommerce Validations
    
    @Ecommerce
    Scenario: Validate the product search functionality
        Given I am on the eCommerce homepage
        When I search for "laptop"
        Then I should see a list of products related to "laptop"
    
    Scenario: Validate the add to cart functionality
        Given I am on the product page for "laptop"
        When I click on "Add to Cart"
        Then the product should be added to my shopping cart
    
    Scenario: Validate the checkout process
        Given I have items in my shopping cart
        When I proceed to checkout
        And I enter valid payment information
        Then my order should be successfully placed