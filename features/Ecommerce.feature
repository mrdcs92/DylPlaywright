Feature: Ecommerce validations
  @Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "misterdcs92@gmail.com" and "1999222dst!taN1999222"
    When Add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and Place the Order
    Then Verify order in present in the Order History

  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error Message is displayed

    Examples:
    | username    | password  |
    | rahulshetty | learning  |
    | dylans      | bebeboo   |