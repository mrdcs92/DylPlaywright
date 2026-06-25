Feature: Ecommerce validations
  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error Message is displayed

    Examples:
    | username    | password  |
    | rahulshetty | learning  |
    | dylans      | bebeboo   |