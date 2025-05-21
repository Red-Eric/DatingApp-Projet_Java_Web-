package com.dating.datingApp.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Collections.singletonList("http://localhost:5173")); // Autorise uniquement ton frontend
        config.setAllowedMethods(Collections.singletonList("*")); // Autorise toutes les méthodes (GET, POST, PUT, DELETE)
        config.setAllowedHeaders(Collections.singletonList("*")); // Autorise tous les headers
        config.setAllowCredentials(true); // Permet l'authentification

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
