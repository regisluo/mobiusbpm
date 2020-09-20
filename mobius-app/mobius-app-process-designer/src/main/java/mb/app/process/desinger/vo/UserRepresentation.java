package mb.app.process.desinger.vo;

import java.util.ArrayList;
import java.util.List;

public class UserRepresentation {
    protected String id;
    protected String firstName;
    protected String lastName;
    protected String email;
    protected String fullName;
    protected String tenantId;
    protected List<GroupRepresentation> groups = new ArrayList();
    protected List<String> privileges = new ArrayList();

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getTenantId() {
        return this.tenantId;
    }

    public void setTenantId(String tenantId) {
        if (tenantId != null && !tenantId.isEmpty()) {
            this.tenantId = tenantId;
        } else {
            this.tenantId = null;
        }

    }

    public List<GroupRepresentation> getGroups() {
        return this.groups;
    }

    public void setGroups(List<GroupRepresentation> groups) {
        this.groups = groups;
    }

    public List<String> getPrivileges() {
        return this.privileges;
    }

    public void setPrivileges(List<String> privileges) {
        this.privileges = privileges;
    }
}
