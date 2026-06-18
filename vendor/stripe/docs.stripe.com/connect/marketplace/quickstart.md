# Marketplace quickstart

# Build a marketplace integration 

> You can customize this guide by selecting integration options in the [Interactive platform guide](https://docs.stripe.com/connect/interactive-platform-guide.md).

Use this working code sample to integrate Stripe Hosted Checkout for one-time payments with Stripe Connect. With this approach, Stripe hosts the checkout page for you.

  const handleCreateProduct = async (formData) => {
    if (!accountId) return;
    if (needsOnboarding) return;

    const response = await fetch("/api/create-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, accountId }),
    });

    const data = await response.json();
    setShowForm(false);
  };
export default function Page() {
  // Get the checkout session ID from the URL
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [accountId] = useState(localStorage.getItem("accountId"));

  return (
    <div className="container">
      <p className="message">Your payment was successful</p>

    <a
      href={`https://dashboard.stripe.com/${accountId}`}
      className="button"
      target="_blank"
      rel="noopener noreferrer"
    >
      Go to Connected Account dashboard
    </a>
      <Link to="/" className="button">
        Back to products
      </Link>
    </div>
  );
}
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/create-connect-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const data = await response.json();
      // Update the account ID in the provider
      setAccountId(data.accountId);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };
  const handleStartOnboarding = async () => {
    try {
      const response = await fetch("/api/create-account-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account link");
      }

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Error creating account link:", error);
    }
  };
const Product = ({ name, price, priceId, period, image }) => {
  const { accountId } = useAccount();

  return (
    <div className="product round-border">
      <div className="product-info">
        <img src={image} alt={name} />
        <div className="description">
          <h3>{name}</h3>
          <h5>{price} {period && `/ ${period}`}</h5>
        </div>
      </div>

      <form action="/api/create-checkout-session" method="POST">
        <input type="hidden" name="priceId" value={priceId} />
        <input type="hidden" name="accountId" value={accountId} />
        <button className="button" type="submit">
          Checkout
        </button>
      </form>
    </div>
  );
};
  const fetchProducts = async () => {
    if (!accountId) return;
    if (needsOnboarding) return;
    const response = await fetch(`/api/products/${accountId}`);
    const data = await response.json();
    setProducts(data);
  };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Create a sample product and return a price for it
router.post("/create-product", async (req, res) => {
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const productPrice = req.body.productPrice;
  const accountId = req.body.accountId; // Get the connected account ID

  try {
    // Create the product on the platform
    const product = await stripe.products.create(
      {
        name: productName,
        description: productDescription,
        metadata: { stripeAccount: accountId }
      }
    );

    // Create a price for the product on the platform
    const price = await stripe.prices.create(
      {
        product: product.id,
        unit_amount: productPrice,
        currency: "usd",
        metadata: { stripeAccount: accountId }
      },
    );

    res.json({
      productName: productName,
      productDescription: productDescription,
      productPrice: productPrice,
      priceId: price.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Create a Connected Account
router.post("/create-connect-account", async (req, res) => {
  try {
    // Create a Connect account with the specified controller properties
    const account = await stripe.v2.core.accounts.create({
      display_name: req.body.email,
      contact_email: req.body.email,
      dashboard: "express",
      defaults: {
        responsibilities: {
          fees_collector: "application",
          losses_collector: "application",
        },
      },
      identity: {
        country: "US",
        entity_type: "company",
      },
      configuration: {
        recipient: {
          capabilities: {
            stripe_balance: {
              stripe_transfers: {
                requested: true,
              },
            },
          },
        },
      },
    });

    res.json({ accountId: account.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Create Account Link for onboarding
router.post("/create-account-link", async (req, res) => {
  const accountId = req.body.accountId;
  try {
    const accountLink = await stripe.v2.core.accountLinks.create({
      account: accountId,
      use_case: {
        type: 'account_onboarding',
        account_onboarding: {
          configurations: ['recipient'],
          refresh_url: 'https://example.com',
          return_url: `https://example.com?accountId=${accountId}`,
        },
      },
    });
    res.json({ url: accountLink.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Fetch products for a specific account
router.get("/products/:accountId", async (req, res) => {
  const { accountId } = req.params;

  try {
    const prices = await stripe.prices.search({
      query: `metadata['stripeAccount']:'${accountId}' AND active:'true'`,
      expand: ["data.product"],
      limit: 100,
    });

    res.json(
      prices.data.map((price) => ({
        id: price.product.id,
        name: price.product.name,
        description: price.product.description,
        price: price.unit_amount,
        priceId: price.id,
        period: price.recurring ? price.recurring.interval : null,
        image: "https://i.imgur.com/6Mvijcm.png",
      }))
    );
  } catch (err) {
    console.error("Error fetching prices:", err);
    res.status(500).json({ error: err.message });
  }
});
// Create checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { priceId, accountId } = req.body;

  // Get the price's type from Stripe
  const price = await stripe.prices.retrieve(priceId);
  const priceType = price.type;
  const mode = priceType === 'recurring' ? 'subscription' : 'payment';

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: mode,
    // Defines where Stripe will redirect a customer after successful payment
    success_url: `${process.env.DOMAIN}/done?session_id={CHECKOUT_SESSION_ID}`,
    // Defines where Stripe will redirect if a customer cancels payment
    cancel_url: `${process.env.DOMAIN}`,
    ...(mode === 'subscription' ? {
      subscription_data: {
        application_fee_amount: 123,
        transfer_data: {
          destination: accountId,
        },
      },
    } : {
      payment_intent_data: {
        application_fee_amount: 123,
        transfer_data: {
          destination: accountId,
        },
      },
    }),
  });

  // Redirect to the Stripe hosted checkout URL
  res.redirect(303, session.url);
});
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = "";

    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    let stripeObject;
    let status;
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        stripeObject = event.data.object;
        status = stripeObject.status;
        console.log(`Checkout Session status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleCheckoutSessionCompleted(stripeObject);
        break;
      case "checkout.session.async_payment_failed":
        stripeObject = event.data.object;
        status = stripeObject.status;
        console.log(`Checkout Session status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleCheckoutSessionFailed(stripeObject);
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);
Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
stripe_client = Stripe::StripeClient.new(ENV["STRIPE_SECRET_KEY"])
\# Create a sample product and return a price for it
post "/api/create-product" do
  data = parse_request_body
  product_name = data['productName']
  product_description = data['productDescription']
  product_price = data['productPrice']
  account_id = data['accountId']

  begin
    # Create the product on the platform
    product = Stripe::Product.create({
      name: product_name,
      description: product_description,
      metadata: { stripe_account: account_id }
    })

    # Create a price for the product on the platform
    price = Stripe::Price.create({
      product: product.id,
      unit_amount: product_price,
      currency: 'usd',
      metadata: { stripe_account: account_id }
    })

    content_type :json
    {
      productName: product_name,
      productDescription: product_description,
      productPrice: product_price,
      priceId: price.id
    }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end
\# Create a Connected Account
post "/api/create-connect-account" do
  data = parse_request_body

  begin
    account = stripe_client.v2.core.accounts.create({
      display_name: data['email'],
      contact_email: data['email'],
      dashboard: 'express',
      defaults: {
        responsibilities: {
          fees_collector: 'application',
          losses_collector: 'application',
        },
      },
      identity: {
        country: 'US',
        entity_type: 'company',
      },
      configuration: {
        recipient: {
          capabilities: {
            stripe_balance: {
              stripe_transfers: { requested: true },
            },
          },
        },
      },
    })

    content_type :json
    { accountId: account.id }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end
\# Create Account Link for onboarding
post "/api/create-account-link" do
  data = parse_request_body
  account_id = data['accountId']

  begin
    account_link = stripe_client.v2.core.account_links.create({
      account: account_id,
      use_case: {
        type: 'account_onboarding',
        account_onboarding: {
          configurations: ['recipient'],
          refresh_url: 'https://example.com',
          return_url: "https://example.com?accountId=#{account_id}",
        },
      },
    })

    content_type :json
    { url: account_link.url }.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end
\# Fetch products for a specific account
get "/api/products/:account_id" do
  account_id = params[:account_id]

  begin
    prices = Stripe::Price.search({
      query: "metadata['stripeAccount']:'#{account_id}' AND active:'true'",
      expand: ['data.product'],
      limit: 100,
    })

    products = prices.data.map do |price|
      {
        id: price.product.id,
        name: price.product.name,
        description: price.product.description,
        price: price.unit_amount,
        priceId: price.id,
        image: 'https://i.imgur.com/6Mvijcm.png'
      }
    end

    content_type :json
    products.to_json
  rescue Stripe::StripeError => e
    status 500
    { error: e.message }.to_json
  end
end
  session_params = {
    line_items: [
      {
        price: price_id,
        quantity: 1,
      },
    ],
    mode: mode,
    \# Defines where Stripe will redirect a customer after successful payment
    success_url: "#{ENV['DOMAIN']}/done?session_id={CHECKOUT_SESSION_ID}",
    # Defines where Stripe will redirect if a customer cancels payment
    cancel_url: "#{ENV['DOMAIN']}",
  }

  # Add Connect-specific parameters based on payment mode
  if mode == 'subscription'
    session_params[:subscription_data] ||= {}
    session_params[:subscription_data][:application_fee_amount] = 123
    session_params[:subscription_data][:transfer_data] = {
      destination: account_id,
    }
  else
    session_params[:payment_intent_data] = {
      application_fee_amount: 123,
      transfer_data: {
        destination: account_id,
      },
    }
  end

  session = Stripe::Checkout::Session.create(session_params)
post "/api/webhook" do
  request.body.rewind
  payload = request.body.read

  \# Replace this endpoint secret with your endpoint's unique secret
  # If you are testing with the CLI, find the secret by running 'stripe listen'
  # If you are using an endpoint defined with the API or dashboard, look in your webhook settings
  # at https://dashboard.stripe.com/webhooks
  endpoint_secret = ""

  # Only verify the event if you have an endpoint secret defined.
  # Otherwise use the basic event deserialized directly.
  if endpoint_secret != ""
    signature = request.env["HTTP_STRIPE_SIGNATURE"]
    begin
      event = Stripe::Webhook.construct_event(payload, signature, endpoint_secret)
    rescue => e
      puts "Webhook signature verification failed. #{e.message}"
      halt 400
    end
  else
    event = JSON.parse(payload, symbolize_names: true)
  end

  case event[:type]
  when "checkout.session.completed"
    stripe_object = event[:data][:object]
    status = stripe_object[:status]
    puts "Checkout Session status is #{status}."
    # handle_checkout_session_completed(stripe_object)
  when "checkout.session.async_payment_failed"
    stripe_object = event[:data][:object]
    status = stripe_object[:status]
    puts "Checkout Session status is #{status}."
    # handle_checkout_session_failed(stripe_object)
  else
    # Unexpected event type
    puts "Unhandled event type #{event[:type]}."
  end

  status 200
end

post "/api/thin-webhook" do
  request.body.rewind
  payload = request.body.read

  # Replace this endpoint secret with your endpoint's unique secret
  # If you are testing with the CLI, find the secret by running 'stripe listen'
  # If you are using an endpoint defined with the API or dashboard, look in your webhook settings
  # at https://dashboard.stripe.com/webhooks
  thin_endpoint_secret = nil
  signature = request.env["HTTP_STRIPE_SIGNATURE"]
  begin
    event_notif = stripe_client.parse_event_notification(payload, signature, thin_endpoint_secret)
  rescue => e
    puts "Webhook signature verification failed. #{e.message}"
    halt 400
  end

  if event_notif.type == "v2.account.created"
    stripe_object = event_notif.fetch_related_object
    event = event_notif.fetch_event
    # handle_v2_account_created(stripe_object)
  else
    puts "Unhandled event type #{event_notif.type}."
  end
  status 200
end
import stripe

from stripe import StripeClient
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
@app.route('/api/create-product', methods=['POST'])
def create_product():
    data = parse_request_body()
    product_name = data['productName']
    product_description = data['productDescription']
    product_price = data['productPrice']
    account_id = data['accountId']

    try:
        \# Create the product on the platform
        product = stripe.Product.create(
            name=product_name,
            description=product_description,
            metadata={'stripeAccount': account_id}
        )

        # Create a price for the product on the platform
        price = stripe.Price.create(
            product=product.id,
            unit_amount=product_price,
            currency='usd',
            metadata={'stripeAccount': account_id}
        )

        return jsonify({
            'productName': product_name,
            'productDescription': product_description,
            'productPrice': product_price,
            'priceId': price.id
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/create-connect-account', methods=['POST'])
def create_connect_account():
    data = parse_request_body()

    try:
        account = stripe_client.v2.core.accounts.create({
            "display_name": data.get("email"),
            "contact_email": data.get("email"),
            "dashboard": "express",
            "defaults": {
                "responsibilities": {
                    "fees_collector": "application",
                    "losses_collector": "application",
                }
            },
            "identity": {
                "country": "US",
                "entity_type": "company",
            },
            "configuration": {
                "recipient": {
                    "capabilities": {
                        "stripe_balance": {
                            "stripe_transfers": {"requested": True},
                        }
                    }
                },
            },
        })

        return jsonify({'accountId': account.id})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/create-account-link', methods=['POST'])
def create_account_link():
    data = parse_request_body()
    account_id = data['accountId']

    try:
        account_link = stripe_client.v2.core.account_links.create({
            "account": account_id,
            "use_case": {
                "type": "account_onboarding",
                "account_onboarding": {
                    "configurations": ["recipient"],
                    "refresh_url": "https://example.com",
                    "return_url": f"https://example.com?accountId={account_id}",
                },
            },
        })

        return jsonify({'url': account_link.url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/products/<account_id>', methods=['GET'])
def get_products(account_id):
    try:
        prices = stripe.Price.search(
            query=f"metadata['stripeAccount']:'{account_id}' AND active:'true'",
            expand=['data.product'],
            limit=100
        )

        products = []
        for price in prices.data:
            products.append({
                'id': price.product.id,
                'name': price.product.name,
                'description': price.product.description,
                'price': price.unit_amount,
                'priceId': price.id,
                'image': 'https://i.imgur.com/6Mvijcm.png'
            })

        return jsonify(products)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    checkout_session = stripe.checkout.Session.create(
      line_items=[
        {
          'price': price_id,
          'quantity': 1
        }
      ],
      mode=mode,
      \# Defines where Stripe will redirect a customer after successful payment
      success_url=f"{os.getenv('DOMAIN')}/done?session_id={{CHECKOUT_SESSION_ID}}",
      # Defines where Stripe will redirect if a customer cancels payment
      cancel_url=f"{os.getenv('DOMAIN')}",
      **(
        {
          'subscription_data': {
            'application_fee_amount': 123,
            'transfer_data': {
              'destination': account_id,
            },
          }
        } if mode == 'subscription' else {
          'payment_intent_data': {
            'application_fee_amount': 123,
            'transfer_data': {
              'destination': account_id,
            },
          }
        }
      )
    )
@app.route('/api/webhook', methods=['POST'])
def webhook_received():
    \# Replace this endpoint secret with your endpoint's unique secret
    # If you are testing with the CLI, find the secret by running 'stripe listen'
    # If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    # at https://dashboard.stripe.com/webhooks
    endpoint_secret = ''
    request_data = json.loads(request.data)

    # Only verify the event if you have an endpoint secret defined.
    # Otherwise use the basic event deserialized with JSON.parse
    if endpoint_secret:
        sig_header = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                request.data, sig_header, endpoint_secret
            )
        except stripe.error.SignatureVerificationError as e:
            app.logger.info('Webhook signature verification failed.')
            return jsonify({'error': str(e)}), 400
    else:
        event = request_data

    # Handle the event
    match event['type']:
        case 'checkout.session.completed':
            session = event['data']['object']
            status = session['status']
            app.logger.info(f'Checkout Session status is {status}.')
            # Then define and call a method to handle the checkout session completed.
            # handle_checkout_session_completed(session);
        case 'checkout.session.async_payment_failed':
            session = event['data']['object']
            status = session['status']
            app.logger.info(f'Checkout Session status is {status}.')
            # Then define and call a method to handle the checkout session failed.
            # handle_checkout_session_failed(session);
        case _:
            # Unexpected event type
            app.logger.info(f'Unhandled event type {event["type"]}')

    # Return a 200 response to acknowledge receipt of the event
    return jsonify({'status': 'success'})
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
	http.HandleFunc("/api/webhook", handleWebhook)
	http.HandleFunc("/api/thin-webhook", handleThinWebhook)
// Create a sample product and return a price for it
func createProduct(w http.ResponseWriter, r *http.Request) {
	data := parseRequestBody(r)
	productName := data["productName"].(string)
	productDescription := data["productDescription"].(string)
	productPrice := int64(data["productPrice"].(float64))
	accountId := data["accountId"].(string)

	var p *stripe.Product
	var pr *stripe.Price
	var err error

	// Create the product on the platform
	productParams := &stripe.ProductParams{
		Name:        stripe.String(productName),
		Description: stripe.String(productDescription),
	}
	productParams.AddMetadata("stripeAccount", accountId)
	p, err = product.New(productParams)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a price for the product on the platform
	priceParams := &stripe.PriceParams{
		Product:    stripe.String(p.ID),
		UnitAmount: stripe.Int64(productPrice),
		Currency:   stripe.String("usd"),
	}
	priceParams.AddMetadata("stripeAccount", accountId)
	pr, err = price.New(priceParams)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return the product and price information
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"productName":        productName,
		"productDescription": productDescription,
		"productPrice":       productPrice,
		"priceId":            pr.ID,
	})
}
// Create a Connected Account
func createConnectAccount(w http.ResponseWriter, r *http.Request) {
	data := parseRequestBody(r)
	email := data["email"].(string)

	sc := stripe.NewClient(os.Getenv("STRIPE_SECRET_KEY"))
	displayName := email
	if displayName == "" {
		displayName = "Sample Store"
	}
	params := &stripe.V2CoreAccountCreateParams{
		ContactEmail: stripe.String(email),
		DisplayName:  stripe.String(displayName),
		Identity: &stripe.V2CoreAccountCreateIdentityParams{
			Country:    stripe.String("US"),
			EntityType: stripe.String("company"),
		},
		Configuration: &stripe.V2CoreAccountCreateConfigurationParams{
			Recipient: &stripe.V2CoreAccountCreateConfigurationRecipientParams{
				Capabilities: &stripe.V2CoreAccountCreateConfigurationRecipientCapabilitiesParams{
					StripeBalance: &stripe.V2CoreAccountCreateConfigurationRecipientCapabilitiesStripeBalanceParams{
						StripeTransfers: &stripe.V2CoreAccountCreateConfigurationRecipientCapabilitiesStripeBalanceStripeTransfersParams{
							Requested: stripe.Bool(true),
						},
					},
				},
			},
		},
		Defaults: &stripe.V2CoreAccountCreateDefaultsParams{
			Responsibilities: &stripe.V2CoreAccountCreateDefaultsResponsibilitiesParams{
				FeesCollector:   stripe.String("application"),
				LossesCollector: stripe.String("application"),
			},
		},
		Dashboard: stripe.String("express"),
	}
	result, err := sc.V2CoreAccounts.Create(context.TODO(), params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"accountId": result.ID})
}
// Create Account Link for onboarding
func createAccountLink(w http.ResponseWriter, r *http.Request) {
	data := parseRequestBody(r)
	accountId := data["accountId"].(string)

	sc := stripe.NewClient(os.Getenv("STRIPE_SECRET_KEY"))
	params := &stripe.V2CoreAccountLinkCreateParams{
		Account: stripe.String(accountId),
		UseCase: &stripe.V2CoreAccountLinkCreateUseCaseParams{
			Type: stripe.String("account_onboarding"),
			AccountOnboarding: &stripe.V2CoreAccountLinkCreateUseCaseAccountOnboardingParams{
				Configurations: []*string{
					stripe.String("recipient"),
				},
				RefreshURL: stripe.String("https://example.com"),
				ReturnURL: stripe.String("https://example.com?accountId=" + accountId),
			},
		},
	}

	link, err := sc.V2CoreAccountLinks.Create(context.TODO(), params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"url": link.URL})
}
// Fetch products for a specific account
func getProducts(w http.ResponseWriter, r *http.Request) {
	accountId := r.URL.Path[len("/api/products/"):]

	// Search for prices with metadata matching the account ID
	params := &stripe.PriceSearchParams{}
	params.Query = fmt.Sprintf("metadata['stripeAccount']:'%s' AND active:'true'", accountId)
	params.Limit = stripe.Int64(100)
	params.AddExpand("data.product")

	var priceList = price.Search(params).PriceSearchResult()

	var products []map[string]interface{}
	for _, p := range priceList.Data {
		products = append(products, map[string]interface{}{
			"id":          p.Product.ID,
			"name":        p.Product.Name,
			"description": p.Product.Description,
			"price":       p.UnitAmount,
			"priceId":     p.ID,
			"image":       "https://i.imgur.com/6Mvijcm.png",
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}
// Create checkout session
func createCheckoutSession(w http.ResponseWriter, r *http.Request) {
	data := parseRequestBody(r)
	accountId := data["accountId"].(string)
	priceId := data["priceId"].(string)

	// Get the price's type from Stripe
	p, _ := price.Get(priceId, nil)
	priceType := p.Type
	var mode string
	if priceType == "recurring" {
		mode = "subscription"
	} else {
		mode = "payment"
	}

	// Build the basic checkout session params
	checkoutSessionParams := &stripe.CheckoutSessionParams{
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				Price:    stripe.String(priceId),
				Quantity: stripe.Int64(1),
			},
		},
		Mode: stripe.String(mode),
		// Defines where Stripe will redirect a customer after successful payment
		SuccessURL: stripe.String(os.Getenv("DOMAIN") + "/done?session_id={CHECKOUT_SESSION_ID}"),
		// Defines where Stripe will redirect if a customer cancels payment
		CancelURL: stripe.String(os.Getenv("DOMAIN")),
	}

	// Add Connect-specific parameters based on payment mode
	if mode == "subscription" {
		if checkoutSessionParams.SubscriptionData == nil {
			checkoutSessionParams.SubscriptionData = &stripe.CheckoutSessionSubscriptionDataParams{}
		}
		checkoutSessionParams.SubscriptionData.ApplicationFeeAmount = stripe.Int64(123)
		checkoutSessionParams.SubscriptionData.TransferData = &stripe.CheckoutSessionSubscriptionDataTransferDataParams{
			Destination: stripe.String(accountId),
		}
	} else {
		checkoutSessionParams.PaymentIntentData = &stripe.CheckoutSessionPaymentIntentDataParams{
			ApplicationFeeAmount: stripe.Int64(123),
			TransferData: &stripe.CheckoutSessionPaymentIntentDataTransferDataParams{
				Destination: stripe.String(accountId),
			},
		}
	}
	s, err := checkoutSession.New(checkoutSessionParams)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Redirect to the Stripe hosted checkout URL
	http.Redirect(w, r, s.URL, http.StatusSeeOther)
}
// Stripe webhook endpoint
func handleWebhook(w http.ResponseWriter, r *http.Request) {
	payload, _ := io.ReadAll(r.Body)

	// Replace this endpoint secret with your endpoint's unique secret
	// If you are testing with the CLI, find the secret by running 'stripe listen'
	// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
	// at https://dashboard.stripe.com/webhooks
	endpointSecret := ""

	var event stripe.Event
	if endpointSecret != "" {
		signature := r.Header.Get("Stripe-Signature")
		e, err := webhook.ConstructEvent(payload, signature, endpointSecret)
		if err != nil {
			return
		}
		event = e
	} else {
		json.Unmarshal(payload, &event)
	}

	// Handle the event
	switch event.Type {
	case "checkout.session.completed":
		var session stripe.CheckoutSession
		json.Unmarshal(event.Data.Raw, &session)
		status := session.Status
		log.Printf("Checkout Session status is %s.\n", status)
		// Then define and call a method to handle the checkout session completed.
		// handleCheckoutSessionCompleted(session);

	case "checkout.session.async_payment_failed":
		var session stripe.CheckoutSession
		json.Unmarshal(event.Data.Raw, &session)
		status := session.Status
		log.Printf("Checkout Session status is %s.\n", status)
		// Then define and call a method to handle the checkout session failed.
		// handleCheckoutSessionFailed(session);

	default:
		// Unexpected event type
		log.Printf("Unhandled event type %s.\n", event.Type)
	}

	// Return a 200 response to acknowledge receipt of the event
	w.WriteHeader(http.StatusOK)
}
$stripe = new \Stripe\StripeClient([
  "api_key" => $_ENV['STRIPE_SECRET_KEY'],
]);
// Create a sample product and return a price for it
if ($_SERVER['REQUEST_URI'] === '/api/create-product' && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = parseRequestBody();
  $productName = $data['productName'];
  $productDescription = $data['productDescription'];
  $productPrice = $data['productPrice'];
  $accountId = $data['accountId'];

  try {
    // Create the product on the platform
    $product = $stripe->products->create([
      'name' => $productName,
      'description' => $productDescription,
      'metadata' => ['stripeAccount' => $accountId]
    ]);

    // Create a price for the product on the platform
    $price = $stripe->prices->create([
      'product' => $product->id,
      'unit_amount' => $productPrice,
      'currency' => 'usd',
      'metadata' => ['stripeAccount' => $accountId]
    ]);

    echo json_encode([
      'productName' => $productName,
      'productDescription' => $productDescription,
      'productPrice' => $productPrice,
      'priceId' => $price->id,
    ]);
  } catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
  }
  exit;
}
// Create a Connected Account
if ($_SERVER['REQUEST_URI'] === '/api/create-connect-account' && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = parseRequestBody();

  try {
    $account = $stripe->v2->core->accounts->create([
      'display_name' => $data['email'],
      'contact_email' => $data['email'],
      'dashboard' => 'express',
      'defaults' => [
        'responsibilities' => [
          'fees_collector' => 'application',
          'losses_collector' => 'application',
        ],
      ],
      'identity' => [
        'country' => 'US',
        'entity_type' => 'company',
      ],
      'configuration' => [
        'recipient' => [
          'capabilities' => [
            'stripe_balance' => [
              'stripe_transfers' => ['requested' => true],
            ],
          ],
        ],
      ],
    ]);

    echo json_encode(['accountId' => $account->id]);
  } catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
  }
  exit;
}
// Create Account Link for onboarding
if ($_SERVER['REQUEST_URI'] === '/api/create-account-link' && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = parseRequestBody();
  $accountId = $data['accountId'];

  try {
    $accountLink = $stripe->v2->core->accountLinks->create([
      'account' => $accountId,
      'use_case' => [
        'type' => 'account_onboarding',
        'account_onboarding' => [
          'configurations' => ['recipient'],
          'refresh_url' => 'https://example.com',
          'return_url' => 'https://example.com?accountId=' . $accountId,
        ],
      ],
    ]);

    echo json_encode(['url' => $accountLink->url]);
  } catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
  }
  exit;
}
// Fetch products for a specific account
if (preg_match('/^\/api\/products\/(.+)$/', $_SERVER['REQUEST_URI'], $matches) && $_SERVER['REQUEST_METHOD'] === 'GET') {
  $accountId = $matches[1];

  try {
    $prices = $stripe->prices->search([
      'query' => "metadata['stripeAccount']:'" . $accountId . "' AND active:'true'",
      'expand' => ['data.product'],
      'limit' => 100,
    ]);

    $products = [];
    foreach ($prices->data as $price) {
      $products[] = [
        'id' => $price->product->id,
        'name' => $price->product->name,
        'description' => $price->product->description,
        'price' => $price->unit_amount,
        'priceId' => $price->id,
        'image' => 'https://i.imgur.com/6Mvijcm.png',
      ];
    }

    echo json_encode($products);
  } catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
  }
  exit;
}
  $checkout_params = [
    'line_items' => [[
      'price' => $priceId,
      'quantity' => 1,
    ]],
    'mode' => $mode,
    // Defines where Stripe will redirect a customer after successful payment
    'success_url' => $_ENV['DOMAIN'] . '/done?session_id={CHECKOUT_SESSION_ID}',
    // Defines where Stripe will redirect if a customer cancels payment
    'cancel_url' => $_ENV['DOMAIN'],
  ];

  // Add Connect-specific parameters based on payment mode
  if ($mode === 'subscription') {
    $checkout_params['subscription_data'] = array_merge(
      $checkout_params['subscription_data'] ?? [],
      [
        'application_fee_amount' => 123,
        'transfer_data' => [
          'destination' => $accountId,
        ],
      ]
    );
  } else {
    $checkout_params['payment_intent_data'] = [
      'application_fee_amount' => 123,
      'transfer_data' => [
        'destination' => $accountId,
      ],
    ];
  }

  $checkout_session = $stripe->checkout->sessions->create($checkout_params);
if ($_SERVER['REQUEST_URI'] === '/api/webhook' && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $payload = @file_get_contents('php://input');
  $event = null;

  // Replace this endpoint secret with your endpoint's unique secret
  // If you are testing with the CLI, find the secret by running 'stripe listen'
  // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
  // at https://dashboard.stripe.com/webhooks
  $endpoint_secret = '';

  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with json_decode
  if ($endpoint_secret) {
    try {
      $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
      $event = $stripe->webhooks->constructEvent(
        $payload, $sig_header, $endpoint_secret
      );
    } catch(\UnexpectedValueException $e) {
      http_response_code(400);
      exit();
    } catch(\Stripe\Exception\SignatureVerificationException $e) {
      http_response_code(400);
      exit();
    }
  } else {
    $event = json_decode($payload);
  }

  $stripeObject = null;
  $status = null;

  // Handle the event
  switch ($event->type) {
    case 'checkout.session.completed':
      $stripeObject = $event->data->object;
      $status = $stripeObject->status;
      error_log("Checkout Session status is " . $status);
      // Then define and call a method to handle the checkout session completed.
      // handleCheckoutSessionCompleted($stripeObject);
      break;
    case 'checkout.session.async_payment_failed':
      $stripeObject = $event->data->object;
      $status = $stripeObject->status;
      error_log("Checkout Session status is " . $status);
      // Then define and call a method to handle the checkout session failed.
      // handleCheckoutSessionFailed($stripeObject);
      break;
    default:
      error_log('Unhandled event type ' . $event->type);
  }

  // Return a 200 response to acknowledge receipt of the event
  http_response_code(200);
  exit();
}
        Stripe.apiKey = dotenv.get("STRIPE_SECRET_KEY");
        // v2 API client
        StripeClient v2Client = new StripeClient(dotenv.get("STRIPE_SECRET_KEY"));
        // Create a sample product and return a price for it
        post("/api/create-product", (request, response) -> {
            String productName = parseRequestBody(request, "productName");
            String productDescription = parseRequestBody(request, "productDescription");
            Long productPrice = Long.parseLong(parseRequestBody(request, "productPrice"));
            String accountId = parseRequestBody(request, "accountId");

            try {
                Product product;
                Price price;

                // Set the request with metadata for the system's reference
                Map<String, String> metadata = new HashMap<>();
                metadata.put("stripeAccount", accountId);

                // Create the product on the platform
                ProductCreateParams productParams = ProductCreateParams.builder()
                    .setName(productName)
                    .setDescription(productDescription)
                    .putAllMetadata(metadata)
                    .build();
                product = Product.create(productParams);

                // Create a price for the product on the platform
                PriceCreateParams priceParams = PriceCreateParams.builder()
                    .setProduct(product.getId())
                    .setUnitAmount(productPrice)
                    .setCurrency("usd")
                    .putAllMetadata(metadata)
                    .build();
                price = Price.create(priceParams);

                return new Gson().toJson(Map.of(
                    "productName", productName,
                    "productDescription", productDescription,
                    "productPrice", productPrice,
                    "priceId", price.getId()
                ));
            } catch (StripeException e) {
                response.status(500);
                return new Gson().toJson(Map.of("error", e.getMessage()));
            }
        });
        // Create a Connected Account
        post("/api/create-connect-account", (request, response) -> {
            String email = parseRequestBody(request, "email");

            try {
                // Create v2 Account for marketplace
                AccountCreateParams params =
                    AccountCreateParams.builder()
                        .setContactEmail(email)
                        .setDisplayName(email)
                        .setIdentity(
                            AccountCreateParams.Identity.builder()
                                .setCountry(AccountCreateParams.Identity.Country.US)
                                .setEntityType(AccountCreateParams.Identity.EntityType.COMPANY)
                                .build()
                        )
                        .setConfiguration(
                            AccountCreateParams.Configuration.builder()
                                .setRecipient(
                                    AccountCreateParams.Configuration.Recipient.builder()
                                        .setCapabilities(
                                            AccountCreateParams.Configuration.Recipient.Capabilities.builder()
                                                .setStripeBalance(
                                                    AccountCreateParams.Configuration.Recipient.Capabilities.StripeBalance.builder()
                                                        .setStripeTransfers(
                                                            AccountCreateParams.Configuration.Recipient.Capabilities.StripeBalance.StripeTransfers.builder()
                                                                .setRequested(true)
                                                                .build()
                                                        )
                                                        .build()
                                                )
                                                .build()
                                        )
                                        .build()
                                )
                                .build()
                        )
                        .setDefaults(
                            AccountCreateParams.Defaults.builder()
                                .setResponsibilities(
                                    AccountCreateParams.Defaults.Responsibilities.builder()
                                        .setFeesCollector(AccountCreateParams.Defaults.Responsibilities.FeesCollector.APPLICATION)
                                        .setLossesCollector(AccountCreateParams.Defaults.Responsibilities.LossesCollector.APPLICATION)
                                        .build()
                              )
                              .build()
                        )
                        .setDashboard(AccountCreateParams.Dashboard.EXPRESS)
                        .build();

                Account account = v2Client.v2().core().accounts().create(params);
                return new Gson().toJson(Map.of("accountId", account.getId()));
            } catch (StripeException e) {
                response.status(500);
                return new Gson().toJson(Map.of("error", e.getMessage()));
            }
        });
        // Create Account Link for onboarding
        post("/api/create-account-link", (request, response) -> {
            String accountId = parseRequestBody(request, "accountId");

            try {
                com.stripe.param.v2.core.AccountLinkCreateParams params =
                    com.stripe.param.v2.core.AccountLinkCreateParams.builder()
                        .setAccount(accountId)
                        .setUseCase(
                            com.stripe.param.v2.core.AccountLinkCreateParams.UseCase.builder()
                                .setType(com.stripe.param.v2.core.AccountLinkCreateParams.UseCase.Type.ACCOUNT_ONBOARDING)
                                .setAccountOnboarding(
                                    com.stripe.param.v2.core.AccountLinkCreateParams.UseCase.AccountOnboarding.builder()
                                        .addConfiguration(com.stripe.param.v2.core.AccountLinkCreateParams.UseCase.AccountOnboarding.Configuration.RECIPIENT)
                                        .setRefreshUrl("https://example.com")
                                        .setReturnUrl("https://example.com?accountId=" + accountId)
                                        .build()
                                )
                                .build()
                        )
                        .build();

                com.stripe.model.v2.core.AccountLink accountLink = v2Client.v2().core().accountLinks().create(params);
                return new Gson().toJson(Map.of("url", accountLink.getUrl()));
            } catch (StripeException e) {
                response.status(500);
                return new Gson().toJson(Map.of("error", e.getMessage()));
            }
        });
        // Fetch products for a specific account
        get("/api/products/:accountId", (request, response) -> {
            String accountId = request.params(":accountId");

            try {
                List<Map<String, Object>> productsList = new ArrayList<>();
                PriceSearchParams params = PriceSearchParams.builder().
                    setLimit(100L).
                    setQuery("active:'true' AND metadata['stripeAccount']:'" + accountId + "'").
                    addExpand("data.product").
                    build();

                PriceSearchResult prices = Price.search(params);

                for (Price price : prices.getData()) {
                    Product product = (Product) price.getProductObject();
                    productsList.add(Map.of(
                        "id", product.getId(),
                        "name", product.getName(),
                        "description", product.getDescription(),
                        "price", price.getUnitAmount(),
                        "priceId", price.getId(),
                        "image", "https://i.imgur.com/6Mvijcm.png"
                    ));
                }

                return new Gson().toJson(productsList);
            } catch (StripeException e) {
                response.status(500);
                return new Gson().toJson(Map.of("error", e.getMessage()));
            }
        });
            SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .addLineItem(
                    SessionCreateParams.LineItem.builder()
                        .setPrice(priceId)
                        .setQuantity(1L)
                        .build()
                )
                .setMode(mode)
                // Defines where Stripe will redirect a customer after successful payment
                .setSuccessUrl(dotenv.get("DOMAIN") + "/done?session_id={CHECKOUT_SESSION_ID}")
                // Defines where Stripe will redirect if a customer cancels payment
                .setCancelUrl(dotenv.get("DOMAIN"));

            // Add Connect-specific parameters based on payment mode
            if (mode == SessionCreateParams.Mode.SUBSCRIPTION) {
                SessionCreateParams.SubscriptionData.Builder subscriptionDataBuilder =
                    SessionCreateParams.SubscriptionData.builder();
                if (paramsBuilder.build().getSubscriptionData() != null) {
                    subscriptionDataBuilder.setTrialPeriodDays(
                        paramsBuilder.build().getSubscriptionData().getTrialPeriodDays()
                    );
                }
                subscriptionDataBuilder.setApplicationFeeAmount(123L);
                subscriptionDataBuilder.setTransferData(
                    SessionCreateParams.SubscriptionData.TransferData.builder()
                        .setDestination(accountId)
                        .build()
                );
                paramsBuilder.setSubscriptionData(subscriptionDataBuilder.build());
            } else {
                paramsBuilder.setPaymentIntentData(
                    SessionCreateParams.PaymentIntentData.builder()
                        .setApplicationFeeAmount(123L)
                        .setTransferData(
                            SessionCreateParams.PaymentIntentData.TransferData.builder()
                                .setDestination(accountId)
                                .build()
                        )
                        .build()
                );
            }

            Session session = Session.create(paramsBuilder.build());
        post("/api/webhook", (request, response) -> {
            String payload = request.body();
            String sigHeader = request.headers("Stripe-Signature");
            Event event = null;

            // Replace this endpoint secret with your endpoint's unique secret
            // If you are testing with the CLI, find the secret by running 'stripe listen'
            // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
            // at https://dashboard.stripe.com/webhooks
            String endpointSecret = "";

            // Only verify the event if you have an endpoint secret defined.
            // Otherwise use the basic event deserialized with GSON.fromJson
            if (endpointSecret != null && !endpointSecret.isEmpty()) {
                try {
                    event = v2Client.constructEvent(payload, sigHeader, endpointSecret);
                } catch (Exception e) {
                    response.status(400);
                    return "";
                }
            } else {
                // For testing without a real signature
                try {
                    event = Event.GSON.fromJson(payload, Event.class);
                } catch (Exception e) {
                    response.status(400);
                    return "";
                }
            }

            // Handle the event
            StripeObject stripeObject;
            String status;
            EventDataObjectDeserializer dataObjectDeserializer;

            switch (event.getType()) {
                case "checkout.session.completed":
                    dataObjectDeserializer = event.getDataObjectDeserializer();
                    if (dataObjectDeserializer.getObject().isPresent()) {
                        stripeObject = dataObjectDeserializer.getObject().get();
                        Session session = (Session) stripeObject;
                        status = session.getStatus();
                        System.out.println("Checkout Session status is " + status);
                        // Then define and call a method to handle the checkout session completed.
                        // handleCheckoutSessionCompleted(session);
                    }
                    break;
                case "checkout.session.async_payment_failed":
                    dataObjectDeserializer = event.getDataObjectDeserializer();
                    if (dataObjectDeserializer.getObject().isPresent()) {
                        stripeObject = dataObjectDeserializer.getObject().get();
                        Session session = (Session) stripeObject;
                        status = session.getStatus();
                        System.out.println("Checkout Session status is " + status);
                        // Then define and call a method to handle the checkout session failed.
                        // handleCheckoutSessionFailed(session);
                    }
                    break;
                default:
                    System.out.println("Unhandled event type: " + event.getType());
            }

            response.status(200);
            return "";
        });
StripeConfiguration.ApiKey = System.Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY");
// Create a sample product and return a price for it
app.MapPost("/api/create-product", async (HttpContext context) =>
{
    var requestData = await ParseRequestBody(context);
    string productName = requestData.GetProperty("productName").GetString();
    string productDescription = requestData.GetProperty("productDescription").GetString();
    long productPrice = requestData.GetProperty("productPrice").GetInt64();
    string accountId = requestData.GetProperty("accountId").GetString();

    try
    {
        var productService = new ProductService();
        var priceService = new PriceService();
        Product product;
        Price price;

        // Create the product on the platform
        var productOptions = new ProductCreateOptions
        {
            Name = productName,
            Description = productDescription,
            Metadata = new Dictionary<string, string>
            {
                { "stripeAccount", accountId }
            }
        };
        product = await productService.CreateAsync(productOptions);

        // Create a price for the product on the platform
        var priceOptions = new PriceCreateOptions
        {
            Product = product.Id,
            UnitAmount = productPrice,
            Currency = "usd",
            Metadata = new Dictionary<string, string>
            {
                { "stripeAccount", accountId }
            }
        };
        price = await priceService.CreateAsync(priceOptions);

        await context.Response.WriteAsJsonAsync(new
        {
            productName,
            productDescription,
            productPrice,
            priceId = price.Id
        });
    }
    catch (Exception e)
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(new { error = e.Message });
    }
});
// Create a Connected Account
app.MapPost("/api/create-connect-account", async (HttpContext context) =>
{
    var requestData = await ParseRequestBody(context);
    string email = requestData.GetProperty("email").GetString();

    try
    {
        // Create v2 Connect account for marketplace via typed client
        var options = new Stripe.V2.Core.AccountCreateOptions
        {
            ContactEmail = email,
            DisplayName = email,
            Identity = new Stripe.V2.Core.AccountCreateIdentityOptions
            {
                Country = "US",
                EntityType = "company",
            },
            Configuration = new Stripe.V2.Core.AccountCreateConfigurationOptions
            {
                Recipient = new Stripe.V2.Core.AccountCreateConfigurationRecipientOptions
                {
                    Capabilities = new Stripe.V2.Core.AccountCreateConfigurationRecipientCapabilitiesOptions
                    {
                        StripeBalance = new Stripe.V2.Core.AccountCreateConfigurationRecipientCapabilitiesStripeBalanceOptions
                        {
                            StripeTransfers = new Stripe.V2.Core.AccountCreateConfigurationRecipientCapabilitiesStripeBalanceStripeTransfersOptions
                            {
                                Requested = true,
                            },
                        },
                    },
                },
            },
            Defaults = new Stripe.V2.Core.AccountCreateDefaultsOptions
            {
                Responsibilities = new Stripe.V2.Core.AccountCreateDefaultsResponsibilitiesOptions
                {
                    FeesCollector = "application",
                    LossesCollector = "application",
                },
            },
            Dashboard = "express",
            Include = new List<string>
            {
                "configuration.recipient",
                "requirements",
            },
        };
        var client = new StripeClient(System.Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY"));
        var service = client.V2.Core.Accounts;
        Stripe.V2.Core.Account account = service.Create(options);
        await context.Response.WriteAsJsonAsync(new { accountId = account.Id });
    }
    catch (Exception e)
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(new { error = e.Message });
    }
});
// Create Account Link for onboarding
app.MapPost("/api/create-account-link", async (HttpContext context) =>
{
    var requestData = await ParseRequestBody(context);
    string accountId = requestData.GetProperty("accountId").GetString();

    try
    {
        var client = new StripeClient(System.Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY"));
        var service = client.V2.Core.AccountLinks;
        var options = new Stripe.V2.Core.AccountLinkCreateOptions
        {
            Account = accountId,
            UseCase = new Stripe.V2.Core.AccountLinkCreateUseCaseOptions
            {
                Type = "account_onboarding",
                AccountOnboarding = new Stripe.V2.Core.AccountLinkCreateUseCaseAccountOnboardingOptions
                {
                    Configurations = new List<string> { "recipient" },
                    RefreshUrl = "https://example.com",
                    ReturnUrl = $"https://example.com?accountId={accountId}",
                },
            },
        };

        var accountLink = service.Create(options);
        await context.Response.WriteAsJsonAsync(new { url = accountLink.Url });
    }
    catch (Exception e)
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(new { error = e.Message });
    }
});
// Fetch products for a specific account
app.MapGet("/api/products/{accountId}", async (HttpContext context) =>
{
    string accountId = context.Request.RouteValues["accountId"].ToString();

    try
    {
        var priceService = new PriceService();
        IEnumerable<Price> prices;

        var searchOptions = new PriceSearchOptions
        {
            Query = $"metadata['stripeAccount']:'{accountId}' AND active:'true'",
            Expand = new List<string> { "data.product" },
            Limit = 100,
        };

        var searchResult = await priceService.SearchAsync(searchOptions);
        prices = searchResult.Data;

        var products = prices.Select(price => new
        {
            id = price.ProductId,
            name = price.Product.Name,
            description = price.Product.Description,
            price = price.UnitAmount,
            priceId = price.Id,
            image = "https://i.imgur.com/6Mvijcm.png"
        });

        await context.Response.WriteAsJsonAsync(products);
    }
    catch (Exception e)
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(new { error = e.Message });
    }
});
    var options = new Stripe.Checkout.SessionCreateOptions
    {
        LineItems = new List<SessionLineItemOptions>
        {
            new SessionLineItemOptions
            {
                Price = priceId,
                Quantity = 1,
            },
        },
        Mode = mode,
        // Defines where Stripe will redirect a customer after successful payment
        SuccessUrl = $"{System.Environment.GetEnvironmentVariable("DOMAIN")}/done?session_id={{CHECKOUT_SESSION_ID}}",
        // Defines where Stripe will redirect if a customer cancels payment
        CancelUrl = $"{System.Environment.GetEnvironmentVariable("DOMAIN")}",
    };

    // Add Connect-specific parameters based on payment mode
    if (mode == "subscription")
    {
        if (options.SubscriptionData == null)
        {
            options.SubscriptionData = new SessionSubscriptionDataOptions();
        }
        options.SubscriptionData.ApplicationFeeAmount = 123;
        options.SubscriptionData.TransferData = new SessionSubscriptionDataTransferDataOptions
        {
            Destination = accountId,
        };
    }
    else
    {
        options.PaymentIntentData = new SessionPaymentIntentDataOptions
        {
            ApplicationFeeAmount = 123,
            TransferData = new SessionPaymentIntentDataTransferDataOptions
            {
                Destination = accountId,
            },
        };
    }

    var session = await sessionService.CreateAsync(options);
app.MapPost("/api/webhook", async (HttpContext context) =>
{
    using var reader = new StreamReader(context.Request.Body);
    var json = await reader.ReadToEndAsync();

    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    var endpointSecret = "";
    Event stripeEvent;

    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event from the raw JSON.
    try
    {
        if (!string.IsNullOrEmpty(endpointSecret))
        {
            var signature = context.Request.Headers["Stripe-Signature"];
            stripeEvent = EventUtility.ConstructEvent(json, signature, endpointSecret);
        }
        else
        {
            stripeEvent = EventUtility.ParseEvent(json);
        }
    }
    catch (Exception e)
    {
        Console.WriteLine($"Webhook signature verification failed. {e.Message}");
        context.Response.StatusCode = 400;
        return;
    }

    // Handle the event
    switch (stripeEvent.Type)
    {
        case "checkout.session.completed":
        {
            var session = stripeEvent.Data.Object as Stripe.Checkout.Session;
            var status = session?.Status;
            Console.WriteLine($"Checkout Session status is {status}.");
            // Then define and call a method to handle the checkout session completed.
            break;
        }
        case "checkout.session.async_payment_failed":
        {
            var session = stripeEvent.Data.Object as Stripe.Checkout.Session;
            var status = session?.Status;
            Console.WriteLine($"Checkout Session status is {status}.");
            // Then define and call a method to handle the checkout session failed.
            break;
        }
        default:
            // Unexpected event type
            Console.WriteLine($"Unhandled event type {stripeEvent.Type}.");
            break;
    }

    // Return a 200 response to acknowledge receipt of the event
    context.Response.StatusCode = 200;
});
    "express": "^4.19.2",
    "dev": "concurrently \"vite --port 3000 --open\" \"node server.js\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"php -S [::1]:4242 server.php\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"python server.py\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"go run server.go\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"mvn compile exec:java -Dexec.mainClass=com.stripe.sample.Server\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"ruby server.rb\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"dotnet run\"",
    const response = await fetch("/api/create-connect-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const response = await fetch("/api/create-account-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountId }),
    });
    const { url } = await response.json();
    window.location.href = url;
    const response = await fetch("/api/create-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName,
        productDescription,
        productPrice,
        accountId,
      }),
    });
    const response = await fetch(`/api/products/${accountId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    "express": "^4.19.2",
    "dev": "concurrently \"vite --port 3000 --open\" \"node server.js\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"php -S [::1]:4242 server.php\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"python server.py\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"go run server.go\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"mvn compile exec:java -Dexec.mainClass=com.stripe.sample.Server\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"ruby server.rb\"",
    "dev": "concurrently \"vite --port 3000 --open\" \"dotnet run\"",
const Product = ({ name, price, priceId, period, image }) => {
  const { accountId } = useAccount();

  return (
    <div className="product round-border">
      <div className="product-info">
        <img src={image} alt={name} />
        <div className="description">
          <h3>{name}</h3>
          <h5>{price} {period && `/ ${period}`}</h5>
        </div>
      </div>
      <form action="/api/create-checkout-session" method="POST">
        <input type="hidden" name="priceId" value={priceId} />
        <input type="hidden" name="accountId" value={accountId} />
        <button className="button" type="submit">
          Checkout
        </button>
      </form>
    </div>
  );
};
  const fetchProducts = async () => {
    if (!accountId) return;

    try {
      const response = await fetch(`/api/products/${accountId}`);
      if (!response.ok) throw new Error('Failed to fetch products');

      const products = await response.json();
      setDisplayedProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
      const response = await fetch('/api/create-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, accountId }),
      });
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products/${accountId}`);
        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAccount } from "../../components/AccountProvider";

export default function Page() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { accountId } = useAccount();

  return (
    <div className="container">
      <p className="message">Your payment was successful</p>

      <a
        href={`https://dashboard.stripe.com/${accountId}`}
        className="button"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Connected Account dashboard
      </a>

      <Link href="/" className="button">
        Back to products
      </Link>
    </div>
  );
}
      const response = await fetch("/api/create-connect-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const response = await fetch("/api/create-account-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      });
      const data = await response.json();
      window.location.href = data.url;
export async function POST(request) {
  try {
    const { email } = await request.json();

    // Create a Connect account with the specified controller properties
    const account = await stripe.v2.core.accounts.create({
      display_name: email,
      contact_email: email,
      dashboard: "express",
      defaults: {
        responsibilities: {
          fees_collector: "application",
          losses_collector: "application",
        },
      },
      identity: {
        country: "US",
        entity_type: "company",
      },
      configuration: {
        recipient: {
          capabilities: {
            stripe_balance: {
              stripe_transfers: { requested: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ accountId: account.id });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 400 }
    );
  }
}
export async function POST(request) {
  try {
    const { accountId } = await request.json();

    const accountLink = await stripe.v2.core.accountLinks.create({
      account: accountId,
      use_case: {
        type: 'account_onboarding',
        account_onboarding: {
          configurations: ['recipient'],
          refresh_url: 'https://example.com',
          return_url: 'https://example.com',
        },
      },
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error('Error creating account link:', error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 400 }
    );
  }
}
export async function GET(request, { params }) {
  try {
    const { accountId } = await params;

    const prices = await stripe.prices.search({
      query: `metadata['stripeAccount']:'${accountId}' AND active:'true'`,
      expand: ["data.product"],
      limit: 100,
    });

    return NextResponse.json(
      prices.data.map((price) => ({
        id: price.product.id,
        name: price.product.name,
        price: price.unit_amount,
        priceId: price.id,
        period: price.recurring ? price.recurring.interval : null,
        image: "https://i.imgur.com/6Mvijcm.png"
      }))
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 400 }
    );
  }
}
export async function POST(request) {
  try {
    const { productName, productDescription, productPrice, accountId } = await request.json();

    // In marketplace model, create products on the platform with metadata
    const product = await stripe.products.create({
      name: productName,
      description: productDescription,
      metadata: { stripeAccount: accountId },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: productPrice,
      currency: 'usd',
    });

    return NextResponse.json({
      productId: product.id,
      priceId: price.id,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 400 }
    );
  }
}
  const sessionParams = {
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: mode,
    // Defines where Stripe will redirect a customer after successful payment
    success_url: `${process.env.DOMAIN}/done?session_id={CHECKOUT_SESSION_ID}`,
    // Defines where Stripe will redirect if a customer cancels payment
    cancel_url: `${process.env.DOMAIN}`,
  };

  let session;

  if (accountId) {
    // For marketplace model, use transfer_data
    sessionParams.payment_intent_data = {
      application_fee_amount: 123,
      transfer_data: {
        destination: accountId,
      },
    };

    session = await stripe.checkout.sessions.create(sessionParams);
  } else {
    session = await stripe.checkout.sessions.create(sessionParams);
  }
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
### Install dependencies

Run `npm install` from the root of the project to install the dependencies.

### Run the application

Run `npm run dev` from the root of the project to start the application.

### Navigate to the application

Go to <http://localhost:3000/> in your web browser.

### Install the Stripe Node library

Install the package and import it in your code. Alternatively, if you’re starting from scratch and need a package.json file, download the project files using the Download link in the code editor.

#### npm

Install the library:

```bash
npm install --save stripe
```

#### GitHub

Or download the stripe-node library source code directly [from GitHub](https://github.com/stripe/stripe-node).

### Install the Stripe Ruby library

Install the Stripe ruby gem and require it in your code. Alternatively, if you’re starting from scratch and need a Gemfile, download the project files using the link in the code editor.

#### Terminal

Install the gem:

```bash
gem install stripe
```

#### Bundler

Add this line to your Gemfile:

```bash
gem 'stripe'
```

#### GitHub

Or download the stripe-ruby gem source code directly [from GitHub](https://github.com/stripe/stripe-ruby).

### Install the Stripe Java library

Add the dependency to your build and import the library. Alternatively, if you’re starting from scratch and need a sample pom.xml file (for Maven), download the project files using the link in the code editor.

#### Maven

Add the following dependency to your POM and replace {VERSION} with the version number you want to use.

```bash
<dependency>\n<groupId>com.stripe</groupId>\n<artifactId>stripe-java</artifactId>\n<version>{VERSION}</version>\n</dependency>
```

#### Gradle

Add the dependency to your build.gradle file and replace {VERSION} with the version number you want to use.

```bash
implementation "com.stripe:stripe-java:{VERSION}"
```

#### GitHub

Download the JAR directly [from GitHub](https://github.com/stripe/stripe-java/releases/latest).

### Install the Stripe Python package

Install the Stripe package and import it in your code. Alternatively, if you’re starting from scratch and need a requirements.txt file, download the project files using the link in the code editor.

#### pip

Install the package through pip:

```bash
pip3 install stripe
```

#### GitHub

Download the stripe-python library source code directly [from GitHub](https://github.com/stripe/stripe-python).

### Install the Stripe PHP library

Install the library with composer and initialize with your secret API key. Alternatively, if you’re starting from scratch and need a composer.json file, download the files using the link in the code editor.

#### Composer

Install the library:

```bash
composer require stripe/stripe-php
```

#### GitHub

Or download the stripe-php library source code directly [from GitHub](https://github.com/stripe/stripe-php).

### Set up your server

Add the dependency to your build and import the library. Alternatively, if you’re starting from scratch and need a go.mod file, download the project files using the link in the code editor.

#### Go

Make sure to initialize with Go Modules:

```bash
go get -u github.com/stripe/stripe-go/v85
```

#### GitHub

Or download the stripe-go module source code directly [from GitHub](https://github.com/stripe/stripe-go).

### Install the Stripe.net library

Install the package with .NET or NuGet. Alternatively, if you’re starting from scratch, download the files which contains a configured .csproj file.

#### dotnet

Install the library:

```bash
dotnet add package Stripe.net
```

#### NuGet

Install the library:

```bash
Install-Package Stripe.net
```

#### GitHub

Or download the Stripe.net library source code directly [from GitHub](https://github.com/stripe/stripe-dotnet).

### Install the Stripe libraries

Install the packages and import them in your code. Alternatively, if you’re starting from scratch and need a `package.json` file, download the project files using the link in the code editor.

Install the libraries:

```bash
npm install --save stripe @stripe/stripe-js next
```

### Add an endpoint to create a connected account

Set up an endpoint on your server for your client to call to handle creating a connected account.

### Create a connected account

Call the Stripe API to create a connected account. We’ve configured the attributes used based on your preferences. You can prefill verification information, the business profile of the connected account, and other fields on the account if your platform has already collected it.

Use your Stripe API keys to make API requests on behalf of your connected accounts.

### Call the endpoint to create a connected account

Call the endpoint you added above to create a connected account.

### Add an Account Link endpoint

Set up an endpoint on your server to create an Account Link.

### Provide a return URL

When your connected account completes the onboarding flow, it redirects them to the return URL. That doesn’t mean that all information has been collected or that the connected account has no outstanding requirements. It only means that they entered and exited the flow properly.

### Provide a refresh URL

Stripe redirects your connected account to the refresh URL when the link is expired, the link has already been visited, your platform can’t access the connected account, or the account is rejected. Have the refresh URL create a new onboarding Account Link and redirect your connected accounts to it.

### Call the endpoint to create an Account Link

Provide the connected account ID.

### Redirect the connected account to the URL

Send the connected account to Stripe to complete onboarding using Account Link. They’re redirected back to your app when onboarding is complete.

### Connected account completes onboarding data collection

At this point the connected account will be redirected to a hosted form and will put in the necessary onboarding information for the capabilities requested.

When testing your integration, fill account information using [test data](https://docs.stripe.com/connect/testing.md).

### Handle the connected account returning

Display a useful message on the return URL.

### Handle the Account Link refreshing

Generate a new Account Link on the refresh URL.

### Add an endpoint to create a product

Set up an endpoint for creating products and prices. Products define what your connected accounts sell and prices track how much and how often to charge.

### Call the endpoint to create a product

Call the endpoint from the client.

### Add an endpoint to fetch the products

Set up an endpoint for fetching all products for a given connected account.

### Call the endpoint to fetch the products

Call the endpoint within your storefront to fetch all the products.

### Create an endpoint to create a Checkout Session

The `/create-checkout-session` endpoint creates a Checkout Session and redirects the customer to a Stripe-hosted checkout page.

### Add an application fee amount

The amount that your platform plans to take from the payment.

### Indicate the connected account

The connected account that the fund will be transferred to.

### Call the endpoint to redirect the customer to checkout

The `form` makes a request to the `/api/create-checkout-session` endpoint on the server which redirects the customer to a Stripe-hosted checkout page.

### Post-checkout page

After a user completes their payment, Stripe redirects the customer to a payment success page.

### Listen for webhook events

Create a `/webhook` endpoint and obtain your webhook secret key in the [Webhooks](https://dashboard.stripe.com/webhooks) tab in Workbench to listen for events related to your payments. Use a webhook to receive these events and run actions.

### Try it out

You know the integration is working successfully if you complete a payment and see the `/done` page. Once you have the Stripe dashboard setup, the test payment will show there as well. Use any of these test cards to simulate a payment:

| Scenario                            | Card Number      |
| ----------------------------------- | ---------------- |
| Payment succeeds                    | 4242424242424242 |
| Payment requires 3DS authentication | 4000002500003155 |
| Payment is declined                 | 4000000000009995 |
