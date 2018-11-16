Feature: Open web browser and search jobs

   Test open web browser firefox

   Scenario: Visit careers job blizzard
    Given browser to web site "http://careers.blizzard.com/es-mx/"
    When search a jobs
    Then click in label quality assurance
    And looking for list details jobs