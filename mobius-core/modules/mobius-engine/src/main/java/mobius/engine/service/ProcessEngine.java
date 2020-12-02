package mobius.engine.service;

/**
 * facade to provide services to users using the engine
 */
public interface ProcessEngine extends Engine {
    RepositoryService getRepositoryService();

    IamService getIamService();
}
