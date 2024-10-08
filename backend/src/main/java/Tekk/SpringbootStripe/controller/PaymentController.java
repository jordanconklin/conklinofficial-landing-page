package Tekk.SpringbootStripe.controller;

import Tekk.SpringbootStripe.model.PaymentRequest;
import Tekk.SpringbootStripe.model.PaymentSuccessRequest;
import Tekk.SpringbootStripe.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        logger.info("Received payment request: amount={}, currency={}", paymentRequest.getAmount(), paymentRequest.getCurrency());
        try {
            PaymentIntent paymentIntent = stripeService.createPaymentIntent(paymentRequest.getAmount(), paymentRequest.getCurrency());
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", paymentIntent.getClientSecret());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            logger.error("Stripe error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/payment-success")
    public ResponseEntity<String> handlePaymentSuccess(@RequestBody PaymentSuccessRequest request) {
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(request.getPaymentIntentId());
            if ("succeeded".equals(paymentIntent.getStatus())) {
                // Here you can add logic to update your database or perform any other actions
                return ResponseEntity.ok("Payment processed successfully");
            } else {
                return ResponseEntity.badRequest().body("Payment has not succeeded");
            }
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing payment");
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Payment controller is working");
    }
}