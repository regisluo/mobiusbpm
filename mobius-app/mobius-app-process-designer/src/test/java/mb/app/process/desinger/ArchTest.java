package mb.app.process.desinger;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("mb.app.process.desinger");

        noClasses()
            .that()
                .resideInAnyPackage("mb.app.process.desinger.service..")
            .or()
                .resideInAnyPackage("mb.app.process.desinger.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..mb.app.process.desinger.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
